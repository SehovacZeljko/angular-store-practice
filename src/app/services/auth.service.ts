import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    created_at: string;
  };
  token: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private tokenKey = 'auth_token';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // On app start: restore user from token if exists
    const token = this.getToken();
    if (token) {
      this.fetchMe().subscribe(); // will set currentUserSubject
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  register(name: string, email: string, password: string, password_confirmation: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      name, email, password, password_confirmation
    }).pipe(
      tap((res: any) => {
        this.setToken(res.token);
        this.currentUserSubject.next(res.user);
      })
    );
  }

  fetchMe(): Observable<any> {
    return this.http.get<{ user: User }>(`${this.apiUrl}/me`)
      .pipe(
        tap(res => this.currentUserSubject.next(res.user))
      );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.clearAuth(),
      error: () => this.clearAuth() // even if backend fails, clean frontend
    });
  }

  logoutAllDevices(): void {
    this.http.post(`${this.apiUrl}/logout-all`, {}).subscribe(() => {
      this.clearAuth();
    });
  }

  private clearAuth() {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Token helpers
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}