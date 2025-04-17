import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService)
    return false;
  if (!authService.isLoggedIn()) {
    router.navigate(['']);
    return false;
  }
  return true;
};


export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (!authService)
    return false;
  if (authService.isLoggedIn()) {
    router.navigate(['']);
    return false;
  }
  return true;
};
