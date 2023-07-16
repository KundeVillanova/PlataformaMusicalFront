import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../login/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { UsuarioDto } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = environment.apiURLBase + '/api/usuarios';
  private jwtHelper: JwtHelperService;

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  login(usuario: Usuario): Observable<any> {
    const url = `${environment.apiURLBase}/authenticate`;
    const body = {
      nome: usuario.nome,
      password: usuario.password
    };
    return this.http.post<any>(url, body).pipe(
      tap(response => {
        const token = response.accessToken;
        localStorage.setItem('access_token', token);
      })
    );
  }

  getToken(): string | null {
    const token = localStorage.getItem('access_token');
    return token !== null ? token : null;
  }
  
  obterUsername(): string {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      if (decodedToken && decodedToken.sub) {
        return decodedToken.sub;
      }
    }
    return 'deu ruim';
  }

  getUsuarioByUsername(username: string): Observable<UsuarioDto> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<UsuarioDto>(`${this.baseUrl}/nome/${username}`, { headers });
  }
  
  sair(){
    localStorage.removeItem('access_token')
  }

  updateUsuario(idUser: number, usuario: UsuarioDto): Observable<any> {
    const url = `${this.baseUrl}/${idUser}`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(url, usuario, { headers });
  }  


  adicionarTiposMusicais(idUser: number, tiposMusicaisIds: number[]): Observable<any> {
    const url = `${this.baseUrl}/${idUser}/tipos-musicais`;
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(url, tiposMusicaisIds, { headers });
  }
}
