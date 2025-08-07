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
        path: 'lost-orders',
        loadComponent: () =>
          import('./lost-orders/lost-orders.component').then(
            (m) => m.LostOrdersComponent
          ),
        data: {
          title: 'ادارة الطلبيات المفقودة',
        },
      },
      {
        path: 'work-days',
        loadComponent: () =>
          import('./work-days/work-days.component').then(
            (m) => m.WorkDaysComponent
          ),
        data: {
          title: 'ادارة ايام العمل',
        },
      },
      {
        path: 'sheets',
        loadComponent: () =>
          import('./sheets-management/sheets-management.component').then(
            (m) => m.SheetsManagementComponent
          ),
        data: {
          title: 'ادارة المستندات',
        },
      }
    ],
  },
];
