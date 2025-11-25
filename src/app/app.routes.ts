import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
