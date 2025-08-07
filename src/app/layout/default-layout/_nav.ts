import { INavData } from '@coreui/angular-pro';
import { Roles } from '../../../core/interfaces/iauth';

export const navItems: INavData[] = [
  {
    name: $localize`:@@home:الصفحة الرئيسية`,
    url: '/home',
    iconComponent: { name: 'cilHome' },
  },
  {
    attributes: {
      Roles: [Roles.MedRep, Roles.MedSup, Roles.SalesRep, Roles.SalesSup, Roles.Admin],
    },
    name: $localize`:@@dashboards:لوحات التحكم`,
    url: '/dashboards',
    iconComponent: { name: 'cilChartLine' },
    children: [
      {
        name: $localize`:@@clinics-dashboard:لوحة تحكم العيادات`,
        url: '/dashboards/clinics',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup, Roles.Admin],
        },
      },
        {
        name: $localize`:@@pharmacies-dashboard:لوحة تحكم الصيدليات`,
        url: '/dashboards/pharmacies',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.SalesRep, Roles.SalesSup, Roles.Admin],
        },
      },
    ],
  },
  {
    attributes: {
      Roles: [Roles.MedRep, Roles.MedSup, Roles.SalesRep, Roles.SalesSup,Roles.Admin],
    },
    name: $localize`:@@reports:التقارير`,
    url: '/reports',
    iconComponent: { name: 'cilChartPie' },
    children: [
      {
        name: $localize`:@@clinics-report:تقرير العيادات`,
        url: '/reports/clinics',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup, Roles.Admin],
        },
      },
      {
        name: $localize`:@@pharmacies-report:تقرير الصيدليات`,
        url: '/reports/pharmacies',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.SalesRep, Roles.SalesSup, Roles.Admin],
        },
      },
    ],
  },
  {
    attributes: {
      Roles: [Roles.MedRep, Roles.MedSup, Roles.SalesRep, Roles.SalesSup],
    },
    name: $localize`:@@visits:الزيارات `,
    url: '/visits',
    iconComponent: { name: 'cilLocationPin' },
    children: [
      {
        name: $localize`:@@add-clinic-visit:تسجيل زيارة عيادة`,
        url: '/visits/clinics/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup,],
        },
      },
        {
        name: $localize`:@@add-pharmacy-visit:تسجيل زيارة صيدلية`,
        url: '/visits/pharmacies/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.SalesRep, Roles.SalesSup],
        },
      },
    ],
  },
   {
    attributes: {
      Roles: [Roles.MedRep, Roles.MedSup],
    },
    name: $localize`:@@requests:الطلبات`,
    url: '/requests',
    iconComponent: { name: 'cilPlus' },
    children: [
      {
        name: $localize`:@@sample-request:طلب عينات`,
        url: '/requests/samples/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup],
        },
      },
         {
        name: $localize`:@@sales-request:طلب نشاط تسويقي`,
        url: '/requests/sales/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup],
        },
      },
      {
        name: $localize`:@@manage-requests:ادارة الطلبات`,
        url: '/requests/manage',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedRep, Roles.MedSup],
        },
      },
    ],
  },
   {
    attributes: {
      Roles: [Roles.OrdersOfficer, Roles.FinancialOfficer],
    },
    name: $localize`:@@collections:التحصيلات`,
    url: '/collections',
    iconComponent: { name: 'cilHandshake' },
    children: [
      {
        name: $localize`:@@payment-collection:تحصيل مالي`,
        url: '/collections/payments/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.FinancialOfficer],
        },
      },
         {
        name: $localize`:@@order-collection:تحصيل طلب`,
        url: '/collections/orders/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.OrdersOfficer],
        },
      },
    ],
  },
    {
    attributes: {
      Roles: [Roles.MedSup],
    },
    name: $localize`:@@ratings:التقييمات`,
    url: '/rates',
    iconComponent: { name: 'cilStar' },
    children: [
      {
        name: $localize`:@@rate-visits-rep:تقييم مندوب الزيارات`,
        url: '/rates/visits-rep/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.MedSup],
        },
      },
    ],
  },
   {
    attributes: {
      Roles: [Roles.Admin],
    },
    name: $localize`:@@general-management:الادارة العامة`,
    url: '/general-management',
    iconComponent: { name: 'cilAppsSettings' },
    children: [
      {
        name: $localize`:@@work-days-management:ادارة ايام العمل`,
        url: '/general-management/work-days',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.Admin],
        },
      },
      {
        name: $localize`:@@sheets-management:ادارة المستندات`,
        url: '/general-management/sheets',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.Admin],
        },
      },
      {
        name: $localize`:@@lost-orders-management:ادارة الطلبيات المفقودة`,
        url: '/general-management/lost-orders',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.Admin],
        },
      },
    ],
  },
  {
    attributes: {
      Roles: [Roles.Admin],
    },
    name: $localize`:@@user-management:ادارة المستخدميين`,
    url: '/user-management',
    iconComponent: { name: 'cilPeople' },
    children: [
      {
        name: $localize`:@@add-user:اضافة مستخدم`,
        url: '/user-management/add',
        icon: 'nav-icon-bullet',
        attributes: {
          Roles: [Roles.Admin],
        },
      },
    ],
  },
];
