import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const router = inject(Router);
  if (isLoggedIn) {
    return router.parseUrl('/dashboard');
  }
  return true;
};
