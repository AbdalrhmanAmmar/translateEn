import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import usersData from './data';
import {
  BadgeComponent,
  ButtonDirective,
  ButtonModule,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  ColComponent,
  CollapseDirective,
  DatePickerComponent,
  FormModule,
  FormSelectDirective,
  IColumn,
  IItem,
  InputGroupComponent,
  ModalComponent,
  ModalModule,
  MultiSelectModule,
  RowComponent,
  SmartPaginationModule,
  SmartTableComponent,
  SpinnerModule,
  TemplateIdDirective,
} from '@coreui/angular-pro';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  cilCalendar,
  cilDescription,
  cilDollar,
  cilFile,
  cilSave,
  cilUser,
} from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { IRequest, IRequestsPagedSearchRequest, ISalesResponse, ISamplesResponse, IUpdateRequestStatus, statusType } from '../../../core/interfaces/icollection';
import { RequestsService } from '../../../core/services/modules-services/requests.service';

@Component({
  selector: 'app-manage',
  imports: [
    BadgeComponent,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    CollapseDirective,
    SmartTableComponent,
    ReactiveFormsModule,
    ModalModule,
    TemplateIdDirective,
    ButtonModule,
    ColComponent,
    RowComponent,
    IconDirective,
    DatePickerComponent,
    FormModule,
    FormSelectDirective,
    ButtonDirective,
    SmartPaginationModule,
    SpinnerModule
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent implements OnInit {
  ngOnInit(): void {
    this.getRequests();
  }

  requests: WritableSignal<IRequest[]> = signal([]);
  activePage: WritableSignal<number> = signal(1);
  totalPages: WritableSignal<number> = signal(1);
  pageSize: WritableSignal<number> = signal(10);
  manageRequestsFormLookups: WritableSignal<any> = signal({ saleTypes: [], doctors: [] });
  currentSelectedRequest: WritableSignal<IRequest | null> = signal(null);

  icons = {
    cilCalendar,
    cilFile,
    cilUser,
    cilDollar,
    cilDescription,
    cilSave,
  };

   private readonly _FormBuilder = inject(FormBuilder);
  private readonly _RequestsService = inject(RequestsService);

    editRequestForm : FormGroup = this._FormBuilder.group({
        id: [null],
        type: [null],
        requestDate: [null, Validators.required],
        typeSpecificDate: [null, Validators.required],
        typeSpecificSelect: [null, Validators.required],
        typeSpecificNumber: [null, Validators.required],
        doctorName: [null, Validators.required],
        notes: [null],
  });

  @ViewChild('acceptRequestModal', { static: true }) acceptRequestModal!: ModalComponent;
  @ViewChild('rejectRequestModal', { static: true }) rejectRequestModal!: ModalComponent;
  @ViewChild('editRequestModal', { static: true }) editRequestModal!: ModalComponent;



 usersData: IItem[] = usersData;

  columns: (IColumn | string)[] = [
    {
      key: 'medRepName',
      label: 'المندوب',
       _style: { width: '15%' },
      _props: {  class: 'fw-bold' },
    },
    {
      key: 'requestDate',
      label: 'التاريخ',
       _style: { width: '5%' },
      _props: { class: 'fw-bold' }
    },
    {
      key: 'type',
      label: 'النوع',
      _style: { width: '5%' },
      _props: { class: 'fw-bold' }
    },
    {
      key: 'status',
      label: 'الحالة',
      _style: { width: '5%' },
      _props: { class: 'fw-bold' },
      filter: true,
      sorter: true
    },
    {
      key: 'show',
      label: '',
      _style: { width: '5%' },
      filter: false,
      sorter: false
    }
  ];

  getBadge(status: string) {
    switch (status) {
      case 'تم الموافقة':
        return 'success';
      case 'قيد الانتظار':
        return 'warning';
      case 'تم الرفض':
        return 'danger';
      default:
        return 'primary';
    }
  }

  getItem(item: any) {
    return Object.keys(item);
  }

  details_visible = Object.create({});

  toggleDetails(item: any) {
    this.details_visible[item] = !this.details_visible[item];
  }

  getRequests(indx : number = 1) {

    const request: IRequestsPagedSearchRequest = {
      filter: null,
      pageIndex: indx,
      pageSize: 10,
    };
  
    this._RequestsService.getRequests(request).subscribe({
      next: (res) => {
        this.requests.set(res.items);
        this.totalPages.set(res.pageCount);
        this.activePage.set(res.currentPageIndex);
      },
      error: (err) => {
        console.error('Failed to load requests', err);
      }
    });
  }

  onPageChange(page: number): void {
    this.activePage.set(page);
    this.getRequests(page);
  }

  updateRequestStatus(status: statusType): void {
    const request: IUpdateRequestStatus = {
      requestId: this.currentSelectedRequest()!.id!,
      requestType: this.currentSelectedRequest()!.requestType!,
      status: status
    };

    this._RequestsService.updateRequestStatus(request).subscribe({
      next: () => {
        this.getRequests(this.activePage());
      },
      error: (err) => {
      }
    });
  }

  openEditRequestModal(request: IRequest): void {
    this.currentSelectedRequest.set(request);
    this.editRequestForm.patchValue({
      id: request.id,
      type: request.type,
      requestDate: request.requestDate,
      typeSpecificDate: request.TypeSpecificDate,
      typeSpecificSelect: request.TypeSpecificSelect,
      typeSpecificNumber: request.TypeSpecificNumber,
      doctorName: request.doctorName,
      notes: request.notes
    });
  }

  openAcceptRejectModal(request: IRequest): void {
    this.currentSelectedRequest.set(request);
  }


  onEditRequestSubmit(): void {

  }

  rejectRequest(): void {
    this.updateRequestStatus(statusType.Rejected);
  }

  acceptRequest(): void {
    this.updateRequestStatus(statusType.Approved);
  }
}
