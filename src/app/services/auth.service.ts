// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if (TokenStorage.hasToken()) {
      this.fetchMe().subscribe();
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(res => {
        TokenStorage.set(res.token);
        this.currentUserSubject.next(res.user);
      }));
  }

  register(name: string, email: string, password: string, password_confirmation: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password, password_confirmation })
      .pipe(tap(res => {
        TokenStorage.set(res.token);
        this.currentUserSubject.next(res.user);
      }));
  }

  fetchMe(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`)
      .pipe(tap(res => this.currentUserSubject.next(res.user)));
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.clear(),
      error: () => this.clear()
    });
  }

  private clear() {
    TokenStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return TokenStorage.hasToken();
  }
}