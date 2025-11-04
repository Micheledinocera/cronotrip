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
    return await $fetch<DBItinerary[]>('/api/itineraries/list');
  };

  const getItineraryById = async (itinerary_id: number) => {
    const itinerary = await $fetch<DBItinerary>(`/api/itineraries/single/?id=${itinerary_id}`);
    return itinerary.itinerary_document;
  };

  const saveItinerary = async (jsonToInsert: Itinerary) => {
    const itinerary = await $fetch<Itinerary>('/api/itineraries/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: jsonToInsert,
    });

    return itinerary;
  };

  return {getItineraries, getItineraryById, saveItinerary};
};
