export interface UsuarioDto {
    idUser: number;
    nome: string;
    email: string;
    dataNascimento: string;
    celular: string;
    senha: string;
    tiposMusicais: number;
    bandas: number[];
    shows: number[];
    experiencias: number[];
}