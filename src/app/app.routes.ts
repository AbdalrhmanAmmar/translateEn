import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from '../core/guards/auth.guard';
import { loginGuard } from '../core/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('../components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    data: {
      title: 'تسجيل الدخول',
    },
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    data: {
      title: '',
    },
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../components/home/routes').then((m) => m.routes),
      },

      {
        path: 'dashboards',
        loadChildren: () =>
          import('../components/dashboards/routes').then((m) => m.routes),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../components/reports/routes').then((m) => m.routes),
      },
      {
        path: 'visits',
        loadChildren: () =>
          import('../components/visits/routes').then((m) => m.routes),
      },
      {
        path: 'requests',
        loadChildren: () =>
          import('../components/requests/routes').then((m) => m.routes),
      },
      {
        path: 'collections',
        loadChildren: () =>
          import('../components/collections/routes').then((m) => m.routes),
      },
      {
        path: 'rates',
        loadChildren: () =>
          import('../components/rates/routes').then((m) => m.routes),
      },
      {
        path: 'general-management',
        loadChildren: () =>
          import('../components/general-management/routes').then((m) => m.routes),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../components/user-management/routes').then((m) => m.routes),
      }
    ],
  },
  { path: '**', redirectTo: 'login' },
];
