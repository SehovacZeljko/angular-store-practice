// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl; // http://localhost:8000

  constructor(private http: HttpClient) {}

  initCsrf() {
    return this.http.get(`${this.baseUrl}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  }

  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, {
      withCredentials: true,
    });
  }

  post<T>(endpoint: string, data: any) {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, {
      withCredentials: true,
    });
  }

  put<T>(endpoint: string, data: any) {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, {
      withCredentials: true,
    });
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, {
      withCredentials: true,
    });
  }
}
