import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Instrumento } from '../models/Instrumento';

@Injectable({
  providedIn: 'root'
})
export class InstrumentoService {
  private apiUrl = `${environment.apiURLBase}/api/instrumentos`;

  constructor(private http: HttpClient) { }

  getAllInstrumentos(): Observable<Instrumento[]> {
    return this.http.get<Instrumento[]>(this.apiUrl);
  }

  getInstrumento(id: number): Observable<Instrumento> {
    return this.http.get<Instrumento>(`${this.apiUrl}/${id}`);
  }

  createInstrumento(instrumento: Instrumento): Observable<number> {
    return this.http.post<number>(this.apiUrl, instrumento);
  }

  updateInstrumento(id: number, instrumento: Instrumento): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, instrumento);
  }

  deleteInstrumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
