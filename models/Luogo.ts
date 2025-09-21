import { Tappa } from "./Tappa";

export interface Luogo {
    nome: string;
    foto: string[];
    coordinate: {
        lat: number;
        long: number;
    };
    tappe: Tappa[];
}