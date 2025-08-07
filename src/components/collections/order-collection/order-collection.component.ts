import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AccordionModule,
  BadgeModule,
  ButtonModule,
  IColumn,
  ModalModule,
  SmartPaginationModule,
  SmartTableComponent,
  SpinnerModule,
  TemplateIdDirective,
} from '@coreui/angular-pro';
import { IconDirective } from '@coreui/icons-angular';
import {
  CollectionStatus,
  CollectionStatusTypes,
  IOrderCollection,
  IOrderCollectionSearchRequest,
} from '../../../core/interfaces/icollection';
import { CollectionsService } from '../../../core/services/modules-services/collections.service';
import { cilPrint, cilCheck, cilX } from '@coreui/icons';
import { NotificationService } from '../../../core/services/helper-services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-collection',
  imports: [ ButtonModule,ModalModule,BadgeModule,SmartTableComponent, TemplateIdDirective, DatePipe, IconDirective, AccordionModule, SmartPaginationModule, CommonModule, SpinnerModule],
  templateUrl: './order-collection.component.html',
  styleUrl: './order-collection.component.scss',
})
export class OrderCollectionComponent implements OnInit {

  // --------------------------------  Dependencies  --------------------------------
  private readonly _CollectionsService = inject(CollectionsService);
  private readonly _router = inject(Router);

  // --------------------------------  Signals  --------------------------------
  orderCollections : WritableSignal<IOrderCollection[]> = signal([]);
  orderCollectionsLoading : WritableSignal<boolean> = signal(true);

  // --------------------------------  Icons  --------------------------------
  icons = {
    cilPrint,
    cilCheck,
    cilX,
  };

// --------------------------------  Tables Columns  --------------------------------
   OrderCollectionsColumns: (IColumn | string)[] = [
    { key: 'name', label: 'الدواء', filter: true, sorter: true },
    { key: 'cost', label: 'السعر', filter: true, sorter: true },
    { key: 'quantity', label: 'الكمية', filter: true, sorter: true },
    { key: 'total', label: 'المجموع', filter: false, sorter: false },
  ];

// --------------------------------  Hooks  --------------------------------
  ngOnInit(): void {
    this.getOrderCollections();
  }

// --------------------------------  API Calls  --------------------------------
getOrderCollections(indx: number = 1): void {
  const body: IOrderCollectionSearchRequest = {
    filter: {},
    pageIndex: indx,
    pageSize: 5,
  };

  this._CollectionsService.getOrderCollections(body).subscribe({
    next: (res) => {
      this.orderCollections.set(res.items);
      this.orderCollectionsLoading.set(false);
    },
    error: (err) => {
    },
  });
}
approveCollection(id : number, modal : any): void {
 
  const body = {
    id: id,
    status: CollectionStatus.Approved,
    statusType: CollectionStatusTypes.OrderCollectionStatus,
  };

    this._CollectionsService.updateCollectionStatus(body).subscribe({
      next: (res) => {
        modal.visible = false;
        NotificationService.fireNotification("تم الموافقة على التحصيل بنجاح");
        this.getOrderCollections();
      },
      error: (err) => {
        
      }
    });
}
rejectCollection(id : number, modal : any): void {
    const body = {
    id: id,
    status: CollectionStatus.Rejected,
    statusType: CollectionStatusTypes.OrderCollectionStatus,
  };

    this._CollectionsService.updateCollectionStatus(body).subscribe({
      next: (res) => {
        modal.visible = false;
        NotificationService.fireNotification("تم رفض التحصيل بنجاح");
        this.getOrderCollections();
      },
      error: (err) => {
        
      }
    });
}

// --------------------------------  Helper Methods  --------------------------------
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
  getTotalPrice(order: IOrderCollection): number {
    let total : number = 0;
    order.products.forEach((product) => {
      total += product.cost * product.quantity;
    })
    return total;
  }

  OrderCollectionsActivePage :  WritableSignal<number> = signal(1);
  OrderCollectionsPages :  WritableSignal<number> = signal(0);

  setOrderCollectionsActivePage(page: number) {
    this.OrderCollectionsActivePage.set(page);
    this.getOrderCollections(page);
  }
}
