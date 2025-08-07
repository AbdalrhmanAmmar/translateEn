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
        redirectTo: 'add',
        pathMatch: 'full',
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./add-user/add-user.component').then(
            (m) => m.AddUserComponent
          ),
        data: {
          title: 'طلب مستخدم',
        },
      },
    ],
  },
];
