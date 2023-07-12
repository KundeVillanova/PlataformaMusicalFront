export interface UsuarioDto {
    idUser: number;
    nome: string;
    email: string;
    dataNascimento: string;
    celular: string;
    senha: string;
    tiposMusicais: number[]; // atualizado para array de números
    bandas: number[];
    shows: number[];
    experiencias: number[];
}
  