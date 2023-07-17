import { Experiencia } from "./Experiencia";
import { Instrumento } from "./Instrumento";

export interface NivelDto {
    experiencia: Experiencia;
    idInstrumento: number;
    idUser?: number;
}
  