import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const router = inject(Router);
  if (isLoggedIn) {
    return true;
  }
  // Redirect to the login page
  return router.parseUrl('/login');
};
