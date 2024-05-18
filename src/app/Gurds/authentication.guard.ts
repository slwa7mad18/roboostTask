import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  if (authenticationService.IsAuthenticated()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
