// src/app/interceptors/csrf.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const isLaravelApi = req.url.includes('localhost:8000');
  if (isLaravelApi) {
    return next(req.clone({ withCredentials: true }));
  }
  return next(req);
};
