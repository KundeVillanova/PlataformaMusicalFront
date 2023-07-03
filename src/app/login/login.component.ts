import { Component } from '@angular/core';
import { Usuario } from './usuario';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: Usuario = new Usuario();
  erroLogin = false;

  constructor(private loginService: LoginService, private router: Router) { }

  logar(): void {
    this.loginService.login(this.usuario).subscribe(
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
