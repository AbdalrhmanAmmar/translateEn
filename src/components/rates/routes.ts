import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'الزيارات',
    },
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'visits-rep/add',
        loadComponent: () =>
          import('./visits-rep/rate-visits-rep.component').then((m) => m.RateVisitsRepComponent),
        data: {
          title: 'تقييم مندوب الزيارات',
        },
      },
    ],
  },
];
