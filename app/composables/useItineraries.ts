export interface DBItinerary {
  itinerary_json_id: number;
  itinerary_document: Itinerary;
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

export const useItinerary = async () => {
  const supabase = useSupabaseClient();

  const getItineraries = async () => {
    const {data, error} = await supabase.from('itineraries_json').select('*');
    if (error) throw error;
    return data as DBItinerary[];
  };

  const getItineraryById = async (itinerary_id: number) => {
    const {data, error} = await supabase
      .from('itineraries_json')
      .select('*')
      .eq('itinerary_json_id', itinerary_id)
      .single();
    if (error) throw error;
    return (data as DBItinerary).itinerary_document;
  };

  const saveItinerary = async (jsonToInsert: Itinerary) => {
    const {data, error} = await supabase
      .from('itineraries_json')
      .insert([{itinerary_document: jsonToInsert}])
      .select()
      .single();
    if (error) throw error;
    return data as DBItinerary;
  };

  return {getItineraries, getItineraryById, saveItinerary};
};
