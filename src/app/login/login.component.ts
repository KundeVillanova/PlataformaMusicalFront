import { Component } from '@angular/core';
import { Usuario } from './usuario';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = new Usuario();
  erroLogin = false;

  constructor(private authService: AuthService, private router: Router) { }

  logar(): void {
    this.authService.login(this.usuario).subscribe(
      () => {
        console.log('Deu bom fiote !!! iihuuu !')
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro ao autenticar usuário:', error);
        this.erroLogin = true;
      }
    );
  }
}
