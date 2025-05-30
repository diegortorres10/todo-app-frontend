import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { SystemRoutes } from '../config/route';

// TODO: Mejora para obtener la ruta actual y redireccionar luego de realizar login, en caso de crear más interfaces
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastrService);

  // Validamos con la info del localstorage
  if (authService.checkAuthStatus()) {
    return true;
  }

  router.navigateByUrl(SystemRoutes.MAIN_URLS.LOGIN);
  toast.error(
    'No pudimos encontrar información de tu usuario. Inicia sesión por favor'
  );
  return false;
};
