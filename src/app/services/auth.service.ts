import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../login/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiURLBase + '/api/usuarios';
  private tokenUrl = environment.apiURLBase + environment.obterTokenUrl;
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

  getUsuario(id: number): Observable<Usuario> {
    const token = this.obterToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`, { headers });
  }

  obterToken(): string {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      const token = this.jwtHelper.decodeToken(tokenString);
      return token;
    }
    return 'token n obtido';
  }
}
