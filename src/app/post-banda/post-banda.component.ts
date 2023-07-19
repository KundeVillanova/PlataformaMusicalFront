import { Component, OnInit } from '@angular/core';
import { PostBandaDTO } from '../models/PostBanda';
import { PostBandaService } from '../services/post-banda.service';
import { TipoMusical } from '../models/TipoMusical';
import { TipoMusicalService } from '../services/tipo-musical.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post-banda',
  templateUrl: './post-banda.component.html',
  styleUrls: ['./post-banda.component.css']
})
export class PostBandaComponent implements OnInit {
  postBandaForm: PostBandaDTO = {
    tituloBanda: '',
    descricao: '',
    vagas: [],
    idTipoMusical: 0,
    idUser: undefined // Assuming you have an AuthService with a getUserId() method to get the logged-in user's ID
  };
  postBandasDoUsuario: PostBandaDTO[] = [];
  tiposMusicais: TipoMusical[] = [];

  constructor(
    private postBandaService: PostBandaService,
    private tipoMusicalService: TipoMusicalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getTiposMusicais();
    this.obterIdUser();
  }

  carregarPostBandasDoUsuario(): void {
    if (this.postBandaForm.idUser) {
      this.postBandaService.getPostBandasByUserId(this.postBandaForm.idUser).subscribe(postBandas => {
        this.postBandasDoUsuario = postBandas;
      });
    }
  }

  getTiposMusicais(): void {
    this.tipoMusicalService.getAllTipoMusicals().subscribe(
      tipos => this.tiposMusicais = tipos,
      error => console.log('Error fetching tipos musicais:', error)
    );
  }

  obterIdUser(): void {
    const username = this.authService.obterUsername();
    this.authService.getUsuarioByUsername(username).subscribe(
      usuario => {
        this.postBandaForm.idUser = usuario.idUser;
        this.carregarPostBandasDoUsuario();
      },
      error => console.log('Error fetching user ID:', error)
    );
  }

  cadastrarPostBanda(): void {
    this.postBandaService.createPostBanda(this.postBandaForm).subscribe(
      idBanda => {
        console.log('Post-banda cadastrado com sucesso! ID:', idBanda);
        // You may want to redirect or show a success message here
      },
      error => console.log('Error creating post-banda:', error)
    );
  }

  editarPostBanda(idBanda: number | undefined): void {
    if (idBanda) {
      // Implemente o código para editar o PostBanda com o ID fornecido
      console.log('Editar PostBanda com ID:', idBanda);
    } else {
      // Trate a situação quando idBanda for undefined
    }
  }

  excluirPostBanda(idBanda: number | undefined): void {
    if (idBanda) {
      this.postBandaService.deletePostBanda(idBanda).subscribe(
        () => {
          console.log('PostBanda excluído com sucesso! ID:', idBanda);
          this.carregarPostBandasDoUsuario();
        },
        error => console.log('Erro ao excluir PostBanda:', error)
      );
    } else {
      console.log('ID do PostBanda não fornecido.');
    }
  }
  
  
}