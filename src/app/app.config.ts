// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor'; // ← Bearer token interceptor

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // Only the Bearer token interceptor — NO csrfInterceptor!
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ],
};