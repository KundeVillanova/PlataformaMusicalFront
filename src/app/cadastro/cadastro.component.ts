import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegistrationRequest } from '../models/RegistrationRequest';
import { CorsConfig } from 'src/config/CorsConfig';
import { RegistrationRequestService } from '../services/registration-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
 
  registrationRequest: RegistrationRequest = new RegistrationRequest('', '', '', '', '');

  constructor(
    private http: HttpClient,
    private registrationRequestService: RegistrationRequestService, 
    private router: Router
  ) { }

  cadastrar(): void {
    this.registrationRequestService.createUsuario(this.registrationRequest).subscribe(
      () => {
        console.log('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Erro ao cadastrar usuário:', error);
      }
    );
  }
}
