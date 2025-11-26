
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Public routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  },

  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(c => c.RegisterComponent)
  },

  // Dedicated error pages
  {
    path: 'unauthorized',
    loadComponent: () => import('./error-pages/unauthorized/unauthorized.component')
      .then(c => c.UnauthorizedComponent),
    title: 'Unauthorized'
  },
  {
    path: 'forbidden',
    loadComponent: () => import('./error-pages/forbidden/forbidden.component')
      .then(c => c.ForbiddenComponent),
    title: 'Forbidden'
  },
  {
    path: 'not-found',
    loadComponent: () => import('./error-pages/not-found/not-found.component')
      .then(c => c.NotFoundComponent),
    title: 'Page Not Found'
  },
  {
    path: 'error',
    loadComponent: () => import('./error-pages/server-error/server-error.component')
      .then(c => c.ServerErrorComponent),
    title: 'Something Went Wrong'
  },

  // Protected routes
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent),
    canMatch: [authGuard],
    title: 'My Profile'
  },

  // Wildcard – must be LAST
  { path: '**', redirectTo: '/not-found' }
];
