import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostBandaDTO } from '../models/PostBanda';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostBandaService {
  private baseUrl =  environment.apiURLBase + '/api/postBandas';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllPostBandas(): Observable<PostBandaDTO[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<PostBandaDTO[]>(this.baseUrl, { headers });
  }

  getPostBanda(idBanda: number): Observable<PostBandaDTO> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<PostBandaDTO>(`${this.baseUrl}/${idBanda}`, { headers });
  }

  createPostBanda(postBandaDTO: PostBandaDTO): Observable<number> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<number>(this.baseUrl, postBandaDTO, { headers });
  }

  updatePostBanda(idBanda: number, postBandaDTO: PostBandaDTO): Observable<number> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<number>(`${this.baseUrl}/${idBanda}`, postBandaDTO, { headers });
  }

  deletePostBanda(idBanda: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.baseUrl}/${idBanda}`, { headers });
  }

  getPostBandasByUserId(idUser: number): Observable<PostBandaDTO[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<PostBandaDTO[]>(`${this.baseUrl}/user/${idUser}`, { headers });
  }
}

