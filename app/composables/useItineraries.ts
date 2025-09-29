export interface Itinerary {
    id: number;
    photo: string;
    name: string;
    short_desc: string;
    desc: string;
    days?:Day[]
}

export interface Day {
    data?: string;
    subtitle?: string;
    places: Place[];
}
export interface Place {
    name: string;
    photo: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
    events: Event[];
}
export interface Event {
    name: string;
    categoria: Category;
    coordinates?: {
        lat: number;
        lng: number;
    };
    prezzo?: number;
    photo: string[];
}

export const useItineraries = async () => {
  return await useFetch<Itinerary[]>('https://dummyjson.com/c/52ef-2590-4475-b2ff')
}

export const useItinerary = async () => {
  return await useFetch<Itinerary>('https://dummyjson.com/c/7098-2bfe-4946-82cf')
}
