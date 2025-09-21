import { Giorno } from "./Giorno";

export interface Itinerario {
    id: number;
    name: string;
    durata: number;
    giorno: Giorno[];
}