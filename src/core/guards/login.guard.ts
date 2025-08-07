import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../current-user/user-store';

export const loginGuard: CanActivateFn = () => {
    const router = inject(Router);
    const user = UserStore.getUser();
    if (user !== null && user !== undefined) {
      router.navigate(['/home']);
      return false;
    }
  
    return true;
  };
  