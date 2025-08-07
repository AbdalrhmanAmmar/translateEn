import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'التحصيلات',
    },
    children: [
      {
        path: '',
        redirectTo: 'view',
        pathMatch: 'full',
      },
      {
        path: 'payments/add',
        loadComponent: () =>
          import('./payment-collection/payment-collection.component').then(
            (m) => m.PaymentCollectionComponent
          ),
        data: {
          title: 'تحصيل مالي',
        },
      },
      {
        path: 'orders/add',
        loadComponent: () =>
          import('./order-collection/order-collection.component').then(
            (m) => m.OrderCollectionComponent
          ),
        data: {
          title: 'تحصيل طلب',
        },
      },
    ],
  },
];
