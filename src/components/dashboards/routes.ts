import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'لوحات التحكم',
    },
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'clinics',
        loadComponent: () =>
          import('./clinics-dashboard/clinics-dashboard.component').then(
            (m) => m.ClinicsDashboardComponent
          ),
        data: {
          title: 'لوحة تحكم العيادات',
        },
      },
      {
        path: 'pharmacies',
        loadComponent: () =>
          import('./pharmacies-dashboard/pharmacies-dashboard.component').then(
            (m) => m.PharmaciesDashboardComponent
          ),
        data: {
          title: 'لوحة تحكم الصيدليات',
        },
      }
    ],
  },
];
