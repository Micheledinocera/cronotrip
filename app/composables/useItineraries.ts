export interface Itinerary {
    id: number;
    photos?: string;
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
    link?:{
        label:string,
        url:string
    };
    category: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
    price?: number;
    photos?: string[];
    moments?:[{
        name:string,
        desc?:string,
        photos?:string[],
        price?:number,
        coordinates?: {
            lat: number;
            lng: number;
        }; //for trekking type mainly
    }]
}

export const useItineraries = async () => {
  return await useFetch<Itinerary[]>('https://dummyjson.com/c/082e-dd1f-47de-a14e')
}

export const useItinerary = async () => {
//   return await useFetch<Itinerary>('https://dummyjson.com/c/4539-50bf-40c5-b704')
  return await useFetch<Itinerary>('https://dummyjson.com/c/ca4c-ff78-4de2-bb4b')
//   return await useFetch<Itinerary>('https://dummyjson.com/c/d64f-fc15-4972-923e')
}
