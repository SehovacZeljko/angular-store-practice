// src/app/app.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private api = inject(ApiService);

  ngOnInit() {
    this.api.initCsrf().subscribe({
      next: () => console.log('CSRF cookie set'),
      error: (err) => console.error('CSRF failed:', err),
    });
  }
}
