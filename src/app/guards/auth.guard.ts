import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '@services/login.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(LoginService);
  if(authService.estadoAutenticado()){
    return true;
  }else{
    return inject(Router).createUrlTree(['/login']);
  }
};
