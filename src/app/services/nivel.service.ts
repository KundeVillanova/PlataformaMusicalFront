import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Nivel } from '../models/Nivel';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  private apiUrl = environment.apiURLBase + '/api/nivels';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllNivels(): Observable<Nivel[]> {
    const headers = this.getHeaders();
    return this.http.get<Nivel[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getNivel(idNivel: number): Observable<Nivel> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${idNivel}`;
    return this.http.get<Nivel>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  createNivel(nivel: Nivel): Observable<number> {
    const headers = this.getHeaders();
    return this.http.post<number>(this.apiUrl, nivel, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateNivel(idNivel: number, nivel: Nivel): Observable<void> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${idNivel}`;
    return this.http.put<void>(url, nivel, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteNivel(idNivel: number): Observable<void> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${idNivel}`;
    return this.http.delete<void>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    // Aqui você pode tratar o erro de acordo com a necessidade da sua aplicação
    console.error('Ocorreu um erro:', error);
    return throwError('Erro ao processar requisição. Tente novamente mais tarde.');
  }
}
