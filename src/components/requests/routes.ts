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
        path: 'samples/add',
        loadComponent: () =>
          import('./sample/sample.component').then(
            (m) => m.SampleComponent
          ),
        data: {
          title: 'طلب عينات',
        },
      },
      {
        path: 'sales/add',
        loadComponent: () =>
          import('./sale/sale.component').then((m) => m.SaleComponent),
        data: {
          title: 'طلب نشاط تسويقي',
        },
      },
      {
        path: 'manage',
        loadComponent: () =>
          import('./manage/manage.component').then((m) => m.ManageComponent),
        data: {
          title: 'ادارة الطلبات',
        },
      },
    ],
  },
];
