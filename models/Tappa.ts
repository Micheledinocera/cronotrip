import { Categoria } from "./Categoria";

export interface Tappa {
    nome: string;
    categoria: Categoria;
    prezzo?: number;
    foto: string[];
}