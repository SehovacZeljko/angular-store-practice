// src/app/components/header/header.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router,} from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

 
  isLoggedIn$ = this.auth.isLoggedIn$;
  currentUser$ = this.auth.currentUser$;


  logo = '';
  logoText = 'MyApp';
  sticky = true;
  transparent = false;
  showSearch = true;
  theme: 'light' | 'dark' = 'light';

  navLinks: NavLink[] = [
    { label: 'Home', href: '/home' },
    { label: 'Profile', href: '/profile' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },

  ];

  mobileMenuOpen = false;
  searchQuery = '';

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSearch(event: Event): void {
    event.preventDefault();
    console.log('Search query:', this.searchQuery);
  }

  onSignIn(): void {
    this.router.navigate(['/login']);
  }

  onGetStarted(): void {
    this.router.navigate(['/register']);
  }

  onLogout(): void {
    this.auth.logout();
    this.mobileMenuOpen = false; 
  }

  navigateTo(href: string): void {
    this.router.navigate([href]);
    this.mobileMenuOpen = false; 
  }
}