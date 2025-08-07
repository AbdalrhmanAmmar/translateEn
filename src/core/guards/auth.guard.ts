import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {UserStore} from '../current-user/user-store'
import {EncryptionService} from '../services/helper-services/encryption.service'

export const authGuard: CanActivateFn =  () => {
  const router = inject(Router)
   const user = UserStore.getUser();
 
  if(user !== null && user !== undefined){
      return true;
  }
  else
  {
    router.navigate(['/login'])
    return false;
  }
};

