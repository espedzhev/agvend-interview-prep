import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000';
  private http = inject(HttpClient);

  getRoot(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/your-fastapi-endpoint`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/your-fastapi-endpoint`, data);
  }
}
