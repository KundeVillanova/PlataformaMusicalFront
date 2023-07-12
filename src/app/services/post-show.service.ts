import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostShowDTO } from '../models/PostShowDto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostShowService {
  private baseUrl = `${environment.apiURLBase}/api/postShows`;

  constructor(private http: HttpClient) { }

  getAllPostShows(): Observable<PostShowDTO[]> {
    return this.http.get<PostShowDTO[]>(this.baseUrl);
  }

  getPostShow(idShow: number): Observable<PostShowDTO> {
    return this.http.get<PostShowDTO>(`${this.baseUrl}/${idShow}`);
  }

  createPostShow(postShowDTO: PostShowDTO): Observable<number> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<number>(this.baseUrl, postShowDTO, { headers });
  }

  updatePostShow(idShow: number, postShowDTO: PostShowDTO): Observable<number> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<number>(`${this.baseUrl}/${idShow}`, postShowDTO, { headers });
  }

  deletePostShow(idShow: number): Observable<void> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.baseUrl}/${idShow}`, { headers });
  }
}
