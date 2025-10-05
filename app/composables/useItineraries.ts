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
    link:{
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
}

export interface FoodActivity extends Activity{
    menu:[
        {
            name:string,
            photos?:string[],
            price?:number
        }
    ]
}

export const useItineraries = async () => {
  return await useFetch<Itinerary[]>('https://dummyjson.com/c/082e-dd1f-47de-a14e')
}

export const useItinerary = async () => {
  return await useFetch<Itinerary>('https://dummyjson.com/c/eaec-d243-44c0-bd94')
}
