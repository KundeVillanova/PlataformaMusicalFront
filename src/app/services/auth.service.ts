import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = environment.apiURLBase +'/api/usuarios'; 

  constructor(private http: HttpClient) {}

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  obterToken(): string {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return 'token n obtido';
  }


}
