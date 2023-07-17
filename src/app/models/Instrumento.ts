import { Experiencia } from "./Experiencia";

export interface Instrumento {
    idInstrumento: number;
    nomeInstrumento: INSTRUMENTOS;
    experiencia: Experiencia;
}
  
export enum INSTRUMENTOS {
    VOCAL = 'VOCAL',
    GUITARRA = 'GUITARRA',
    BATERIA = 'BATERIA',
    BAIXO = 'BAIXO',
    TECLADO = 'TECLADO',
    VIOLAO = 'VIOLAO'
}
  