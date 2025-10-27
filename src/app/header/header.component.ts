import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  // Configuration - Edit these properties
  logo = ''; // Add your logo URL here
  logoText = 'MyApp';
  sticky = true;
  transparent = false;
  showSearch = true;
  theme: 'light' | 'dark' = 'light';

  navLinks: NavLink[] = [
    { label: 'Home', href: '/', icon: '🏠' },
    { label: 'Products', href: '/products', icon: '📦' },
    { label: 'Services', href: '/services', icon: '⚙️' },
    { label: 'About', href: '/about', icon: 'ℹ️' },
    { label: 'Contact', href: '/contact', icon: '📧' },
  ];

  mobileMenuOpen = false;
  searchQuery = '';

  constructor(private router: Router) {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSearch(event: Event): void {
    event.preventDefault();
    console.log('Search query:', this.searchQuery);
    // Implement your search logic here
  }

  onSignIn(): void {
    console.log('Sign in clicked');
    // this.router.navigate(['/login']);
  }

  onGetStarted(): void {
    console.log('Get started clicked');
    // this.router.navigate(['/signup']);
  }

  navigateTo(href: string): void {
    // this.router.navigate([href]);
    console.log('Navigate to:', href);
  }
}
