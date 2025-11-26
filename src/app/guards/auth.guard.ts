// import { inject } from '@angular/core';
// import { CanMatchFn, Router, Route, UrlSegment } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { map } from 'rxjs';

// export const authGuard: CanMatchFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   // Use the observable version for reactive correctness
//   return authService.isLoggedIn$.pipe(
//     map(isLoggedIn => {
//       if (isLoggedIn) {
//         return true;
//       }

//       // Redirect to login and remember where user was going
//       return router.createUrlTree(['/login'], {
//         queryParams: { returnUrl: location.pathname }
//       });
//     })
//   );
// };

import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanMatchFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn$.pipe(
    map(isLoggedIn => {
      if (isLoggedIn) return true;

      // Redirect to dedicated 401 page
      return router.createUrlTree(['/unauthorized'], {
        queryParams: { returnUrl: location.pathname }
      });
    })
  );
};