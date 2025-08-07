import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import {
  AccordionModule,
  BadgeComponent,
  ButtonModule,
  IColumn,
  ModalModule,
  ModalToggleDirective,
  MultiSelectModule,
  SmartPaginationModule,
  SmartTableComponent,
  SpinnerModule,
  TemplateIdDirective,
} from '@coreui/angular-pro';
import { cil3d, cilCalendar, cilCheck, cilChevronBottom, cilChevronTop, cilDollar, cilPrint, cilWallet, cilX } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import {
  IPaymentCollection,
  IPaymentCollectionSearchRequest,
  IPharmacyOrders,
  CollectionStatus,
  CollectionStatusTypes,
} from '../../../core/interfaces/icollection';
import {NotificationService} from '../../../core/services/helper-services/notification.service'
import { CollectionsService } from './../../../core/services/modules-services/collections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-collection',
  imports: [SpinnerModule, CommonModule, ModalToggleDirective,ModalModule,ButtonModule,BadgeComponent ,SmartTableComponent, TemplateIdDirective, DatePipe, IconDirective, IconDirective, MultiSelectModule, AccordionModule, SmartPaginationModule],
  templateUrl: './payment-collection.component.html',
  styleUrl: './payment-collection.component.scss',
})
export class PaymentCollectionComponent implements OnInit {


  // -------------------------------- View Childs --------------------------------
  
  //  --------------------------------  Dependencies  --------------------------------
  private readonly _CollectionsService = inject(CollectionsService);
  private readonly _router = inject(Router);

  //  --------------------------------  Signals  -------------------------------- 
  paymentCollections: WritableSignal<IPaymentCollection[]> = signal([]);
  filteredPaymentCollections: WritableSignal<IPaymentCollection[]> = signal([]);
  pharmacyOrders: WritableSignal<IPharmacyOrders[]> = signal([]);

  paymentCollectionsLoading: WritableSignal<boolean> = signal(true);
  pharmacyOrdersLoading: WritableSignal<boolean> = signal(true);



  // --------------------------------  Tables Columns  --------------------------------
    paymentCollectionsColumns: (IColumn | string)[] = [
    { key: 'date', label: 'التاريخ', filter: true, sorter: true },
    { key: 'organization', label: 'الصيدلية', filter: true, sorter: true },
    { key: 'cost', label: 'المبلغ', filter: true, sorter: true },
    { key: 'invoiceNumber', label: 'رقم الإيصال	', filter: false, sorter: false,},
    { key: 'statusName', label: 'الحالة', filter: false, sorter: false },
    { key: 'Procedures', label: 'الإجراءات', filter: false, sorter: false },
  ];
    pharmacyOrdersColumns: (IColumn | string)[] = [
    { key: 'name', label: 'الدواء', filter: true, sorter: true },
    { key: 'cost', label: 'السعر', filter: true, sorter: true },
    { key: 'quantity', label: 'الكمية', filter: true, sorter: true },
    { key: 'total', label: 'المجموع', filter: false, sorter: false },
  ];

  // --------------------------------  Properties  --------------------------------
   icons = {
    cilPrint,
    cilCheck,
    cilX,
    cilWallet,
    cil3d,
    cilDollar,
    cilCalendar,
    cilChevronTop,
    cilChevronBottom
  };

  // --------------------------------  Selected items  --------------------------------
  selectedPaymentCollectionItem: IPaymentCollection | null = null;
  selectedPaymentCollectionFilter = signal<string[]>([]);
  
  //  --------------------------------  Lifecycle hooks  -------------------------------- 
  ngOnInit(): void {
    this.getPaymentCollections();
    this.getPharmacyOrders();
  }

// --------------------------------  API Calls  -------------------------------- 
getPaymentCollections(pageIdx : number = 1):void
{
  const body: IPaymentCollectionSearchRequest = {
    filter:  {},
    pageIndex: pageIdx,
    pageSize: 5,
  };

  this._CollectionsService.getPaymentCollections(body).subscribe({
    next: (res) => {
      this.paymentCollectionsPages.set(res.pageCount);
      this.paymentCollectionsActivePage.set(res.currentPageIndex);
      this.paymentCollections.set(res.items);
      this.filterPaymentCollections(this.selectedPaymentCollectionFilter());
      this.paymentCollectionsLoading.set(false);
    },
    error: (err) => {
      this.paymentCollectionsLoading.set(true);
    }
  });
}

getPharmacyOrders(pageIdx : number = 1): void {
  const body: IPaymentCollectionSearchRequest = {
    filter: { },
    pageIndex: pageIdx,
    pageSize: 5,
  };
  this._CollectionsService.getPharmacyOrders(body).subscribe({
    next: (res) => {
      this.pharmacyOrdersPages.set(res.pageCount);
      this.pharmacyOrdersActivePage.set(res.currentPageIndex);
      this.pharmacyOrders.set(res.items);
      this.pharmacyOrdersLoading.set(false);
    },
    error: (err) => {
      this.pharmacyOrdersLoading.set(true);
    }
  });
}

approveCollectionOrOrder(id : number, type : CollectionStatusTypes, modal : any)
{

  const body = {
    id: id,
    status: CollectionStatus.Approved,
    statusType: CollectionStatusTypes.PaymentCollectionStatus,
  };

  if (type === CollectionStatusTypes.PaymentCollectionStatus) {
    
    this._CollectionsService.updateCollectionStatus(body).subscribe({
      next: (res) => {
        modal.visible = false;
        NotificationService.fireNotification("تم الموافقة على التحصيل بنجاح");
        this.getPaymentCollections();
      },
      error: (err) => {
      }
    });
  } else if (type === CollectionStatusTypes.PharmacyOrderStatus) {
    body.statusType = CollectionStatusTypes.PharmacyOrderStatus;
    this._CollectionsService.updateCollectionStatus(body).subscribe({
      next: (res) => {
        modal.visible = false;
        NotificationService.fireNotification("تم الموافقة على الطلب بنجاح");
        this.getPharmacyOrders();
      },
      error: (err) => {
      }
    });
  }
  
}

rejectCollectionOrOrder(id : number, type : CollectionStatusTypes, modal: any)
{
   const body = {
    id: id,
    status: CollectionStatus.Rejected,
    statusType: CollectionStatusTypes.PaymentCollectionStatus,
  };

  if (type === CollectionStatusTypes.PaymentCollectionStatus) {
    
    this._CollectionsService.updateCollectionStatus(body).subscribe({
      next: (res) => {
        modal.visible = false;
        NotificationService.fireNotification("تم رفض التحصيل بنجاح");
        this.getPaymentCollections();
      },
      error: (err) => {
        this._router.navigate(['/error']);
      }
    });
  } else if (type === CollectionStatusTypes.PharmacyOrderStatus) {
    body.statusType = CollectionStatusTypes.PharmacyOrderStatus;
    this._CollectionsService.updateCollectionStatus(body).subscribe({
      next: (res) => {
        modal.visible = false;
        NotificationService.fireNotification("تم رفض الطلب بنجاح");
        this.getPharmacyOrders();
      },
      error: (err) => {
        this._router.navigate(['/error']);
      }
    });
  }
}

// --------------------------------  Filter Methods  --------------------------------
filterPaymentCollections(filter: string[]): void {
  if (filter.length > 0) {
    this.selectedPaymentCollectionFilter.set(filter);
      const filteredCollections = this.paymentCollections().filter((collection) => {
      return (
        filter.includes(collection.status.toString()) 
      );
    });
    this.filteredPaymentCollections.set(filteredCollections);
  }
  else
  {
    this.filteredPaymentCollections.set(this.paymentCollections());
  }
}
  
// ------------------------------  Helper methods --------------------------------
  getStatusColor(status: CollectionStatus): 'warning' | 'success' | 'danger' {
  switch (status) {
    case CollectionStatus.Pending:
      return 'warning';
    case CollectionStatus.Approved:
      return 'success';
    case CollectionStatus.Rejected:
      return 'danger';
    default:
      return 'warning';
  }
}

  getTotalPrice(order: IPharmacyOrders): number {
    let total : number = 0;
    order.products.forEach((product) => {
      total += product.cost * product.quantity;
    })
    return total;
  }

  onPageChange(page: number)
  {
    console.log("Page changed to: ", page);
  }

  paymentCollectionsActivePage :  WritableSignal<number> = signal(1);
  paymentCollectionsPages :  WritableSignal<number> = signal(1);

  pharmacyOrdersActivePage :  WritableSignal<number> = signal(1);
  pharmacyOrdersPages :  WritableSignal<number> = signal(1);

  setPaymentCollectionsActivePage(page: number) {
    this.paymentCollectionsActivePage.set(page);
    this.getPaymentCollections(page);
  }

    setPharmacyOrdersActivePage(page: number) {
    this.pharmacyOrdersActivePage.set(page);
    this.getPharmacyOrders(page);
  }
}