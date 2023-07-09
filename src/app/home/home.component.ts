import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../login/usuario';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: Usuario | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // const userId = 10012; 
    // this.authService.getUsuario(userId).subscribe(
    //   (usuario) => {
    //     this.usuario = usuario;
    //     console.log(usuario);
    //   },
    //   (error) => {
    //     console.error('Erro ao obter o usuário:', error);
    //   }
    // );
  }
}
