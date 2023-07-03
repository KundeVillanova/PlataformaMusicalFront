export class RegistrationRequest {
    nome: string;
    email: string;
    password: string;
    celular?: string;
    dataNascimento?: string;
  
    constructor(nome: string, email: string, password: string, celular?: string, dataNascimento?: string) {
      this.nome = nome;
      this.email = email;
      this.password = password;
      this.celular = celular;
      this.dataNascimento = dataNascimento;
    }
}