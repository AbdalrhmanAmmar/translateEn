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
        path: 'clinics/add',
        loadComponent: () =>
          import('./clinic/add-clinic-visit/add-clinic-visit.component').then(
            (m) => m.AddClinicVisitComponent
          ),
        data: {
          title: 'اضافة زيارة عيادة',
        },
      },
      {
        path: 'pharmacies/add',
        loadComponent: () =>
          import('./pharmacy/add-pharmacy-visit/add-pharmacy-visit.component').then(
            (m) => m.AddPharmacyVisitComponent
          ),
        data: {
          title: 'اضافة زيارة صيدلية',
        },
      }
    ],
  },
];
