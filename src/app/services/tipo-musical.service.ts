import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoMusical } from '../models/TipoMusical';

@Injectable({
  providedIn: 'root'
})
export class TipoMusicalService {

  private baseUrl = `${environment.apiURLBase}/api/tipoMusicals`;

  constructor(private http: HttpClient) {}

  getAllTipoMusicals(): Observable<TipoMusical[]> {
    return this.http.get<TipoMusical[]>(this.baseUrl);
  }

  getTipoMusical(id: number): Observable<TipoMusical> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<TipoMusical>(url);
  }

  createTipoMusical(tipoMusical: TipoMusical): Observable<number> {
    return this.http.post<number>(this.baseUrl, tipoMusical);
  }

  updateTipoMusical(id: number, tipoMusical: TipoMusical): Observable<number> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<number>(url, tipoMusical);
  }

  deleteTipoMusical(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
