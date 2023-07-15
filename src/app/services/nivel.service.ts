import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nivel } from '../models/Nivel';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  private apiUrl = '/api/nivels';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllNivels(): Observable<Nivel[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Nivel[]>(this.apiUrl, { headers });
  }
}
