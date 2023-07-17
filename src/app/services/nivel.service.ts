import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nivel } from '../models/Nivel';
import { AuthService } from './auth.service';
import { NivelDto } from '../models/NivelDto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  private apiUrl = environment.apiURLBase +'/api/nivels';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllNivels(): Observable<Nivel[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Nivel[]>(this.apiUrl, { headers });
  }

  getNivel(idNivel: number): Observable<Nivel> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${idNivel}`;
    return this.http.get<Nivel>(url, { headers });
  }

  createNivel(nivel: NivelDto): Observable<void> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(this.apiUrl, nivel, { headers });
  }
  
  updateNivel(idNivel: number, nivel: Nivel): Observable<number> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${idNivel}`;
    return this.http.put<number>(url, nivel, { headers });
  }

  deleteNivel(idNivel: number): Observable<void> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${idNivel}`;
    return this.http.delete<void>(url, { headers });
  }
}

