import { Evento } from "./Evento";

export interface Luogo {
    nome: string;
    foto: string[];
    coordinate: {
        lat: number;
        long: number;
    };
    eventi: Evento[];
}