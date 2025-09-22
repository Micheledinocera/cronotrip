export interface Itinerary {
    id: number;
    photo: string;
    name: string;
    short_desc: string;
    desc: string;
    duration: number;
}


export const useItineraries = async () => {
  return await useFetch<Itinerary[]>('https://dummyjson.com/c/15e1-af2a-4492-af85')
}
