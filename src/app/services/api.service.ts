// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl; // http://localhost:8000

  constructor(private http: HttpClient) {}

  // NO initCsrf() — we don't need CSRF with Bearer tokens!
  // NO withCredentials — the authInterceptor adds Bearer token automatically

  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  post<T>(endpoint: string, data?: any) {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data ?? {});
  }

  put<T>(endpoint: string, data: any) {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
  }

  patch<T>(endpoint: string, data: any) {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, data);
  }
}