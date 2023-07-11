import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsuarioDto } from '../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  usuario: UsuarioDto | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const username = this.authService.obterUsername();
    console.log('------------->>>> Username: ', username);
    this.authService.getUsuarioByUsername(username).subscribe(usuario => {
      this.usuario = usuario;
      console.log('Usuario Logado:', this.usuario);
    });
  }

  logout(): void {
    this.authService.sair();
    this.router.navigate(['/login']);
  }

}


