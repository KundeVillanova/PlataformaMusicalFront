import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../login/usuario';
import { InstrumentoService } from '../services/instrumento.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: Usuario | undefined;

  constructor(private authService: AuthService, private instrumentoService: InstrumentoService) { }

  ngOnInit(): void {
    const username = this.authService.obterUsername();
    console.log('------------->>>> Username: ', username);
    this.instrumentoService.getAllInstrumentos().subscribe(instrumentos => {
      console.log('Lista de Instrumentos:', instrumentos);
    });
  }
}

