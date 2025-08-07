import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
     
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./home.component').then(m => m.HomeComponent),
        data: {
           title: 'الرئيسية'
        }
      }
    ]
  }
];

