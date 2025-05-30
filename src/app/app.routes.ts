import { Routes } from '@angular/router';
import { SystemRoutes } from './core/config/route';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: SystemRoutes.MAIN_URLS.LOGIN,
    pathMatch: 'full',
  },
  {
    path: SystemRoutes.MAIN_URLS.LOGIN,
    loadComponent: () =>
      import('./modules/auth/signin/signin.component').then(
        (m) => m.SigninComponent
      ),
  },
  {
    path: SystemRoutes.MAIN_URLS.TASK_LIST,
    loadComponent: () =>
      import('./modules/task/task-page/task-page.component').then(
        (m) => m.TaskPageComponent
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: SystemRoutes.MAIN_URLS.LOGIN },
  // TODO: Establecer rutas para 404
];
