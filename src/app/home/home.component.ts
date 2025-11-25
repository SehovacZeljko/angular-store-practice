
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // ← Add this
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent], // ← Add CommonModule
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private api = inject(ApiService);

  // Form
  email = 'test@example.com';
  password = 'password';

  // Results
  pingResult: any;
  loginResult: any;
  profile: any;
  isLoggedIn = false;

  ping() {
    this.api.get('/api/ping').subscribe({
      // ← Add /api
      next: (res) => {
        this.pingResult = res;
        console.log('Ping:', res);
      },
      error: (err: HttpErrorResponse) => {
        this.pingResult = { error: err.message };
      },
    });
  }

  login() {
    this.api
      .post('/api/login', { email: this.email, password: this.password })
      .subscribe({
        // ← Add /api
        next: (res) => {
          this.loginResult = res;
          this.isLoggedIn = true;
          this.loadProfile();
          console.log('Logged in');
        },
        error: (err: HttpErrorResponse) => {
          this.loginResult = { error: err.error?.message || 'Login failed' };
          this.isLoggedIn = false;
        },
      });
  }

  loadProfile() {
    this.api.get('/api/profile').subscribe({
      // ← Add /api
      next: (res) => {
        this.profile = res;
      },
      error: () => {
        this.profile = { error: 'Not authenticated' };
        this.isLoggedIn = false;
      },
    });
  }

  logout() {
    this.api.post('/api/logout', {}).subscribe({
      // ← Add /api
      next: () => {
        this.isLoggedIn = false;
        this.profile = null;
        this.loginResult = { message: 'Logged out' };
      },
    });
  }

  ngOnInit() {
    this.loadProfile(); // Auto-check if logged in
  }
}
