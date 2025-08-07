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
        path: 'clinics',
        loadComponent: () =>
          import('./clinics-report/clinics-report.component').then(
            (m) => m.ClinicsReportComponent
          ),
        data: {
          title: 'تقارير العيادات',
        },
      },
      {
        path: 'pharmacies',
        loadComponent: () =>
          import('./pharmacies-report/pharmacies-report.component').then(
            (m) => m.PharmaciesReportComponent
          ),
        data: {
          title: 'تقارير الصيدليات',
        },
      }
    ],
  },
];
