import { Experiencia } from "./Experiencia";
import { Instrumento } from "./Instrumento";

export interface Nivel {
    idNivel: number;
    experiencia: Experiencia;
    idInstrumento: Instrumento;
}