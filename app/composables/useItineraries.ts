export interface DBItinerary {
  id: number;
  owner_id: string;
  name: string;
  status: string;
  copied_from: number | null;
  document: ItineraryDocument;
  owner?: {display_name: string} | null;
  created_at: string;
  updated_at: string;
}

// Fields that live in their own columns; everything else goes in document
type ItineraryColumns = 'id' | 'name' | 'status' | 'owner_id' | 'owner_name' | 'copied_from';
export type ItineraryDocument = Omit<Itinerary, ItineraryColumns>;

export interface Itinerary {
  id?: number;
  owner_id?: string;
  owner_name?: string;
  copied_from?: number | null;
  status: string;
  photos?: string[];
  name: string;
  short_desc: string;
  desc: string;
  days: Day[];
}

export interface Day {
  data?: string;
  subtitle?: string;
  places: Place[];
}
export interface Place {
  name: string;
  photos?: string[];
  coordinates: Coordinates;
  events: Activity[];
}
export interface Activity {
  name: string;
  desc?: string;
  link?: {
    label: string;
    url: string;
  };
  category: string;
  coordinates?: Coordinates;
  price?: number;
  photos?: string[];
  moments?: Moment[];
}

export interface Moment {
  name: string;
  desc?: string;
  photos?: string[];
  price?: number;
  coordinates?: Coordinates;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

// Columns read with every itinerary: the row and the owner's name from profiles
const ITINERARY_SELECT = '*, owner:profiles(display_name)';

// Status of a new itinerary and of a fresh copy
export const DEFAULT_STATUS = 'planning';

const toItinerary = (row: DBItinerary): Itinerary => ({
  ...row.document,
  id: row.id,
  name: row.name,
  status: row.status,
  owner_id: row.owner_id,
  owner_name: row.owner?.display_name,
  copied_from: row.copied_from,
});

const toRow = (itinerary: Itinerary) => {
  const {id, name, status, owner_id, owner_name, copied_from, ...document} = itinerary;
  return {name, status, document};
};

// Skeleton copy (docs/wiki/viaggi/itinerario-e-viaggio.md): only the structure, nothing of the
// trip lived by the owner. Whitelisted, so photos, prices, moments and day dates are left out.
const toSkeleton = (itinerary: Itinerary): ItineraryDocument => ({
  short_desc: itinerary.short_desc,
  desc: itinerary.desc,
  days: itinerary.days.map((day) => ({
    subtitle: day.subtitle,
    places: day.places.map((place) => ({
      name: place.name,
      coordinates: place.coordinates,
      events: place.events.map((activity) => ({
        name: activity.name,
        category: activity.category,
        ...(activity.desc && {desc: activity.desc}),
        ...(activity.link && {link: activity.link}),
        ...(activity.coordinates && {coordinates: activity.coordinates}),
      })),
    })),
  })),
});

const PHOTOS_BUCKET = 'Photos';

// Photos of an itinerary, uploaded from the app: <owner_id>/<itinerary_id>/<file>
const photoFolder = (owner_id: string, itinerary_id: number) => `${owner_id}/${itinerary_id}`;

// Replaces strings everywhere in the document (photo references are only in photos arrays)
const replaceRefs = (itinerary: Itinerary, paths: Map<string, string>): Itinerary =>
  JSON.parse(JSON.stringify(itinerary, (_key, value) =>
    Array.isArray(value)
      ? value.flatMap((item) => (typeof item === 'string' && isParkedPhoto(item) ? (paths.has(item) ? [paths.get(item)] : []) : [item]))
      : value
  ));

export const useItinerary = async () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const getItineraries = async () => {
    const {data, error} = await supabase.from('itineraries').select(ITINERARY_SELECT).order('created_at', {ascending: false});
    if (error) throw error;
    return (data as DBItinerary[]).map(toItinerary);
  };

  const getItineraryById = async (itinerary_id: number) => {
    const {data, error} = await supabase
      .from('itineraries')
      .select(ITINERARY_SELECT)
      .eq('id', itinerary_id)
      .single();
    if (error) throw error;
    return toItinerary(data as DBItinerary);
  };

  const insertRow = async (itinerary: Itinerary) => {
    const {data, error} = await supabase.from('itineraries').insert([toRow(itinerary)]).select(ITINERARY_SELECT).single();
    if (error) throw error;
    return toItinerary(data as DBItinerary);
  };

  const updateRow = async (itinerary: Itinerary) => {
    const {data, error} = await supabase.from('itineraries').update(toRow(itinerary)).eq('id', itinerary.id!).select(ITINERARY_SELECT).single();
    if (error) throw error;
    return toItinerary(data as DBItinerary);
  };

  const uploadPhotos = async (folder: string, parked: [string, File][]) => {
    const paths = new Map<string, string>();
    for (const [ref, file] of parked) {
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const path = `${folder}/${crypto.randomUUID()}.${extension}`;
      const {error} = await supabase.storage.from(PHOTOS_BUCKET).upload(path, file, {contentType: file.type});
      if (error) throw error;
      paths.set(ref, path);
    }
    return paths;
  };

  // Photos of the folder that the document no longer uses (replaced or removed). Best effort.
  const removeUnusedPhotos = async (folder: string, itinerary?: Itinerary) => {
    const document = itinerary ? JSON.stringify(itinerary) : '';
    const {data, error} = await supabase.storage.from(PHOTOS_BUCKET).list(folder, {limit: 1000});
    if (error) return console.error(error);
    const unused = data.map((file) => `${folder}/${file.name}`).filter((path) => !document.includes(`"${path}"`));
    if (!unused.length) return;
    const {error: removeError} = await supabase.storage.from(PHOTOS_BUCKET).remove(unused);
    if (removeError) console.error(removeError);
  };

  // Inserts a new itinerary, or updates it when it has an id, then uploads the parked photos.
  // A new itinerary is inserted first, without them, because its id names their folder.
  // owner_id defaults to the signed-in user.
  const saveItinerary = async (itinerary: Itinerary, parkedPhotos = new Map<string, File>()) => {
    const content = JSON.stringify(itinerary);
    const parked = [...parkedPhotos].filter(([ref]) => content.includes(`"${ref}"`));
    const isNew = !itinerary.id;
    if (isNew && !parked.length) return insertRow(itinerary);

    const saved = isNew ? await insertRow(replaceRefs(itinerary, new Map())) : itinerary;
    const folder = photoFolder(user.value!.id, saved.id!);
    try {
      const paths = await uploadPhotos(folder, parked);
      const updated = await updateRow({...replaceRefs(itinerary, paths), id: saved.id});
      await removeUnusedPhotos(folder, updated);
      return updated;
    } catch (error) {
      // a new itinerary without its photos would be saved again on retry: undo it
      if (isNew) await deleteItinerary(saved.id!);
      throw error;
    }
  };

  // Copies are always skeleton copies, owned by the signed-in user
  const copyItinerary = async (itinerary: Itinerary, name: string) => {
    const {data, error} = await supabase
      .from('itineraries')
      .insert([{name, status: DEFAULT_STATUS, copied_from: itinerary.id, document: toSkeleton(itinerary)}])
      .select(ITINERARY_SELECT)
      .single();
    if (error) throw error;
    return toItinerary(data as DBItinerary);
  };

  // Permanent, photos uploaded from the app included: copies stay and lose copied_from
  // (on delete set null), they never share photos (skeleton copy)
  const deleteItinerary = async (itinerary_id: number) => {
    await removeUnusedPhotos(photoFolder(user.value!.id, itinerary_id));
    const {error} = await supabase.from('itineraries').delete().eq('id', itinerary_id);
    if (error) throw error;
  };

  return {getItineraries, getItineraryById, saveItinerary, copyItinerary, deleteItinerary};
};
