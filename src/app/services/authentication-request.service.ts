import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../login/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

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
}

