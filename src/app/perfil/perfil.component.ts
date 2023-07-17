import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsuarioDto } from '../models/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoMusicalService } from '../services/tipo-musical.service';
import { TipoMusical } from '../models/TipoMusical';
import { InstrumentoService } from '../services/instrumento.service';
import { Instrumento } from '../models/Instrumento';
import { NivelDto } from '../models/NivelDto';
import { NivelService } from '../services/nivel.service';
import { Experiencia } from '../models/Experiencia';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  usuario: UsuarioDto | undefined;
  perfilForm: FormGroup;
  tiposMusicais: TipoMusical[] = [];
  instrumentos: Instrumento[] = [];
  experiencias: Experiencia[] = Object.values(Experiencia);

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private tipoMusicalService: TipoMusicalService,
    private instrumentoService: InstrumentoService,
    private nivelService: NivelService
  ) {
    this.perfilForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required, Validators.pattern('\\d{4}-\\d{2}-\\d{2}')]],
      celular: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const username = this.authService.obterUsername();
    this.authService.getUsuarioByUsername(username).subscribe(usuario => {
      this.usuario = usuario;
      this.preencherFormulario();
      this.carregarTiposMusicais();
      this.carregarInstrumentos();
    });
  }

  preencherFormulario(): void {
    if (this.usuario) {
      this.perfilForm.patchValue({
        nome: this.usuario.nome,
        email: this.usuario.email,
        dataNascimento: this.formatarData(this.usuario.dataNascimento),
        celular: this.usuario.celular,
        senha: this.usuario.senha
      });
    }
  }

  formatarData(data: string): string {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = ('0' + (dataObj.getMonth() + 1)).slice(-2);
    const dia = ('0' + dataObj.getDate()).slice(-2);
    return `${ano}-${mes}-${dia}`;
  }

  atualizarPerfil(): void {
    if (this.perfilForm.valid && this.usuario) {
      const perfilAtualizado: UsuarioDto = {
        ...this.usuario,
        nome: this.perfilForm.value.nome,
        email: this.perfilForm.value.email,
        dataNascimento: this.perfilForm.value.dataNascimento,
        celular: this.perfilForm.value.celular,
        senha: this.perfilForm.value.senha
      };
      this.authService.updateUsuario(this.usuario.idUser, perfilAtualizado).subscribe(() => {
        console.log("sucesso");
      });
    }
  }

  carregarTiposMusicais(): void {
    this.tipoMusicalService.getAllTipoMusicals().subscribe(tiposMusicais => {
      this.tiposMusicais = tiposMusicais;
    });
  }
  
  carregarInstrumentos(): void {
    this.instrumentoService.getAllInstrumentos().subscribe(instrumentos => {
      this.instrumentos = instrumentos;
    });
  }

  adicionarEstilosMusicais(): void {
    const tiposMusicaisSelecionados = this.tiposMusicais.filter(tipoMusical => tipoMusical.selecionado).map(tipoMusical => tipoMusical.id);
    if (tiposMusicaisSelecionados.length > 0) {
      this.authService.adicionarTiposMusicais(this.usuario!.idUser, tiposMusicaisSelecionados).subscribe(() => {
        console.log('Estilos musicais adicionados com sucesso');
      });
    }
  }

  adicionarNivelInstrumento(): void {
    if (this.usuario) {
      for (const instrumento of this.instrumentos) {
        const nivel: NivelDto = {
          experiencia: instrumento.experiencia,
          idInstrumento: instrumento.idInstrumento,
          idUser: this.usuario.idUser
        };
        this.nivelService.createNivel(nivel).subscribe(() => {
          console.log('Nível de instrumento adicionado com sucesso');
        });
      }
    }
  }
}
