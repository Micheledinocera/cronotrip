export interface DBItinerary {
  id: number;
  owner_id: string;
  name: string;
  document: Omit<Itinerary, 'id' | 'name'>;
  created_at: string;
  updated_at: string;
}
export interface Itinerary {
  id?: number;
  photos?: string;
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
  coordinates: {
    lat: number;
    lng: number;
  };
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
  coordinates?: {
    lat: number;
    lng: number;
  };
  price?: number;
  photos?: string[];
  moments?: Moment[];
}

export interface Moment {
  name: string;
  desc?: string;
  photos?: string[];
  price?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const toItinerary = (row: DBItinerary): Itinerary => ({...row.document, id: row.id, name: row.name});

export const useItinerary = async () => {
  const supabase = useSupabaseClient();

  const getItineraries = async () => {
    const {data, error} = await supabase.from('itineraries').select('*').order('created_at', {ascending: false});
    if (error) throw error;
    return (data as DBItinerary[]).map(toItinerary);
  };

  const getItineraryById = async (itinerary_id: number) => {
    const {data, error} = await supabase
      .from('itineraries')
      .select('*')
      .eq('id', itinerary_id)
      .single();
    if (error) throw error;
    return toItinerary(data as DBItinerary);
  };

  // owner_id defaults to the signed-in user
  const saveItinerary = async (itinerary: Itinerary) => {
    const {id, name, ...document} = itinerary;
    const {data, error} = await supabase
      .from('itineraries')
      .insert([{name, document}])
      .select()
      .single();
    if (error) throw error;
    return toItinerary(data as DBItinerary);
  };

  return {getItineraries, getItineraryById, saveItinerary};
};
