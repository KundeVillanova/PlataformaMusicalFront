import { Experiencia } from "./Experiencia";
import { Instrumento } from "./Instrumento";

export interface Nivel {
    experiencia: Experiencia;
    idInstrumento: number;
    idUser: number;
}