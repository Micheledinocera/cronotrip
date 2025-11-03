export interface DBItinerary {
  itinerary_json_id: number;
  itinerary_document: Itinerary;
}
export interface Itinerary {
  id: number;
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

export const useItinerary = async () => {
  const getItineraries = async () => {
    const client = useSupabaseClient();
    const {data: itineraries} = await client
      .from('itineraries_json')
      .select('*')
      .overrideTypes<DBItinerary[], {merge: false}>();
    return itineraries!;
  };

  const getItineraryById = async (itinerary_id: number) => {
    const client = useSupabaseClient();
    let {data: itinerary} = await client
      .from('itineraries_json')
      .select('*')
      .eq('itinerary_json_id', itinerary_id)
      .single()
      .overrideTypes<DBItinerary, {merge: false}>();
    console.log("itinerary: ",itinerary)
    return itinerary.itinerary_document as Itinerary;
  };

  const saveItinerary = async (jsonToInsert: Itinerary) => {
    const data = await $fetch<Itinerary>('/api/itineraries/import', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: jsonToInsert,
    });

    return data;
  };

  return {getItineraries, getItineraryById, saveItinerary};
};
