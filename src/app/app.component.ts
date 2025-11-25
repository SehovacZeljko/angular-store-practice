// src/app/app.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';   // ← NEW: use AuthService instead

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);   // ← inject AuthService

  ngOnInit() {
    // If we have a token → try to load the current user
    if (this.authService.isLoggedIn()) {
      this.authService.fetchMe().subscribe({
        next: (res) => {
          console.log('User loaded:', res.user.name);
          // everything is fine – user is authenticated
        },
        error: (err) => {
          console.warn('Token invalid or expired → logging out');
          this.authService.logout();   // clears token + redirects to login
        }
      });
    } else {
      console.log('No token found – user is guest');
      // optional: redirect to login if you want
      // this.router.navigate(['/login']);
    }
  }
}