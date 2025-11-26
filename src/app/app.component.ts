import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.fetchMe().subscribe({
        next: (res) => {
          console.log('User loaded:', res.user.name);
        },
        error: (err) => {
          console.warn('Token invalid or expired → logging out');
          this.authService.logout();
        },
      });
    } else {
      console.log('No token found – user is guest');
    }
  }
}
