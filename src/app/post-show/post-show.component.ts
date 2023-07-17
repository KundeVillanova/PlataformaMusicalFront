import { Component, OnInit } from '@angular/core';
import { PostShowDTO } from '../models/PostShowDto';
import { PostShowService } from '../services/post-show.service';
import { TipoMusicalService } from '../services/tipo-musical.service';
import { AuthService } from '../services/auth.service';
import { TipoMusical } from '../models/TipoMusical';

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit {
  postShowForm: PostShowDTO = {
    tituloShow: '',
    descricao: '',
    dia: '',
    hora: '',
    lugar: '',
    ingressos: undefined,
    idTipoShow: undefined,
    idUser: undefined
  };
  tiposMusicais: TipoMusical[] = [];
  tiposMusicaisSelecionados: number[] = [];

  constructor(
    private postShowService: PostShowService,
    private tipoMusicalService: TipoMusicalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.carregarTiposMusicais();
    this.carregarIdUsuario();
  }

  carregarTiposMusicais(): void {
    this.tipoMusicalService.getAllTipoMusicals().subscribe(tiposMusicais => {
      this.tiposMusicais = tiposMusicais.map(tipoMusical => {
        tipoMusical.selecionado = this.tiposMusicaisSelecionados.includes(tipoMusical.id);
        return tipoMusical;
      });
    });
  }
  

  carregarIdUsuario(): void {
    const username = this.authService.obterUsername();
    this.authService.getUsuarioByUsername(username).subscribe(usuario => {
      this.postShowForm.idUser = usuario.idUser;
    });
  }

  cadastrarPostShow(): void {
    this.postShowService.createPostShow(this.postShowForm).subscribe(() => {
      console.log('PostShow cadastrado com sucesso');
    });
  }
}
