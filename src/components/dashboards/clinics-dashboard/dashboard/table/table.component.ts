// src/app/features/dashboard/table/table.component.ts

import {
  Component,
  effect,
  EffectRef,
  inject,
  OnDestroy,
  signal,
  WritableSignal,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TableModule,
  SmartTableComponent,
  TemplateIdDirective,
  ModalToggleDirective,
  ModalComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalBodyComponent,
  ModalFooterComponent,
  ButtonCloseDirective,
  ButtonDirective,
  RowComponent,
  ColComponent,
  IColumn,
  SmartPaginationModule,
  SpinnerModule,
  ModalService,
} from '@coreui/angular-pro';

import { DashboardService } from '../../../../../core/services/modules-services/dashboards.service';
import {
  IDoctorDetails,
  IDoctorExtraDetailsRequest,
  IDoctorExtraDetailsResponse,
  IDoctorSale,
  IDoctorSample,
  IDoctorVisit,
  IMoreDetails,
  ISearchResponseItems,
} from '../../../../../core/interfaces/idashboard';

import { ILocation } from '../../../../../core/interfaces/ilookup';

@Component({
  selector: 'app-dashboard-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    SmartTableComponent,
    TemplateIdDirective,
    ModalToggleDirective,
    ModalComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonCloseDirective,
    ButtonDirective,
    RowComponent,
    ColComponent,
    SmartPaginationModule,
    SpinnerModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnDestroy {
  private readonly _dashboardSvc = inject(DashboardService);
  private readonly modalService = inject(ModalService);

  test : string = 'test';
  // incoming data & pagination
  data: InputSignal<ISearchResponseItems[]> = input<ISearchResponseItems[]>([]);
  pageIndex: InputSignal<number> = input<number>(1);
  pageSize: InputSignal<number> = input<number>(10);
  pageCount: InputSignal<number> = input<number>(1);

  doctorDetailsVisitsPageIndex: WritableSignal<number> = signal(1);
  doctorDetailsSamplesPageIndex: WritableSignal<number> = signal(1);
  doctorDetailsSalesPageIndex: WritableSignal<number> = signal(1);

  // events
  pageChange: OutputEmitterRef<number> =
    output<number>();
  doctorClicked: OutputEmitterRef<number> = output<number>();
  organizationClicked: OutputEmitterRef<string> = output<string>();
  cityClicked: OutputEmitterRef<string> = output<string>();
  areaClicked: OutputEmitterRef<string> = output<string>();
  segmentClicked: OutputEmitterRef<string> = output<string>();
  brandClicked: OutputEmitterRef<string> = output<string>();
  productClicked: OutputEmitterRef<number> = output<number>();

  // internal state
  visits: WritableSignal<ISearchResponseItems[]> = signal([]);
  moreDetails: WritableSignal<IMoreDetails> = signal({} as IMoreDetails);
  doctorDetails: WritableSignal<IDoctorDetails> = signal({} as IDoctorDetails);
 

  doctorExtraDetailsResponse: WritableSignal<IDoctorExtraDetailsResponse<any>> = signal({} as IDoctorExtraDetailsResponse<any>);

  doctorDetailsLoading: WritableSignal<boolean> = signal(true);
  doctorDetailsVisitsLoading: WritableSignal<boolean> = signal(true);
  doctorDetailsSamplesLoading: WritableSignal<boolean> = signal(true);
  doctorDetailsSalesLoading: WritableSignal<boolean> = signal(true);
  moreDetailsLoading: WritableSignal<boolean> = signal(true);

  private effectRef: EffectRef;

  constructor() {
    // keep visits in sync with incoming data
    this.effectRef = effect(() => {
      this.visits.set(this.data());
    }, { manualCleanup: true });
  }

  // table column definitions
  columns: (IColumn | string)[] = [
    { key: 'visitDate', label: 'التاريخ', _style: { width: '10%' } },
    { key: 'visitTime', label: 'الوقت' },
    { key: 'doctorName', label: 'الطبيب' },
    { key: 'organization', label: 'العيادة' },
    { key: 'city', label: 'المدينة' },
    { key: 'segment', label: 'التصنيف' },
    { key: 'doctorSpecialization', label: 'التخصص' },
    {
      key: 'visitDetails',
      label: '',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
    {
      key: 'doctorDetails',
      label: '',
      _style: { width: '10%' },
      filter: false,
      sorter: false,
    },
  ];

  // format "HH:mm:ss" → "HH:mm"
  formatTime(time: string): string {
    if (!time) return '';
    const [h, m] = time.split(':');
    return h && m ? `${h}:${m}` : time;
  }

  // pagination
  onPageChange(pageIndex: number): void {
    this.pageChange.emit(pageIndex );
  }

  onSamplesPageChange(pageIndex: number): void {
    this.doctorDetailsSamplesPageIndex.set(pageIndex);
    this.getDoctorSamples(pageIndex);
  }

  onSalesPageChange(pageIndex: number): void {
    this.doctorDetailsSalesPageIndex.set(pageIndex);
    this.getDoctorSales(pageIndex);
  }

  onVisitsPageChange(pageIndex: number): void {
    this.doctorDetailsVisitsPageIndex.set(pageIndex);
    this.getDoctorVisits(pageIndex);
  }

  // fetch and show more details in the modal
  onGetVisitDetails(id: number): void {
    this._dashboardSvc.getVisitDetails(id).subscribe({
      next: (res) => {
        this.moreDetails.set(res);
        this.moreDetailsLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load details', err);
        this.moreDetailsLoading.set(true);
      },
    });
  }

  // individual cell clicks
  onDoctorClick(doctorId: number): void {
    this.doctorClicked.emit(doctorId);
  }
  onOrganizationClick(org: string): void {
    this.organizationClicked.emit(org);
  }
  onCityClick(city: string): void {
    this.cityClicked.emit(city);
  }
  onAreaClick(area: string): void {
    this.areaClicked.emit(area);
  }
  onSegmentClick(seg: string): void {
    this.segmentClicked.emit(seg);
  }
  onBrandClick(brand: string): void {
    this.brandClicked.emit(brand);
  }
  onProductClick(productId: number): void {
    this.productClicked.emit(productId);
  }

  ngOnDestroy(): void {
    this.effectRef.destroy();
  }

  onGetDoctorDetails(id: number): void {
    this._dashboardSvc.getDoctorDetails(id).subscribe({
      next: (res) => {
        this.doctorDetails.set(res);
        this.doctorDetailsLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load doctor details', err);
        this.doctorDetailsLoading.set(true);
      },
    });
  }


sampleColumns : IColumn[] = [
  { key: 'medRepName', label: 'المندوب', _style: { width: '25%' } },
  { key: 'visitDate', label: 'تاريخ الطلب', _style: { width: '25%' } },
  { key: 'deliveryDate', label: 'تاريخ التسليم', _style: { width: '20%' } },
  { key: 'product', label: 'المنتج', _style: { width: '10%' } },
  { key: 'quantity', label: 'الكمية', _style: { width: '25%' } },
];

 private previousModalId: string | null = null; 

  showSamplesModal(triggeredFromModalId: string) {
    this.previousModalId = triggeredFromModalId; 
    this.modalService.toggle({ show: false, id: triggeredFromModalId }); 
    this.modalService.toggle({ show: true, id: 'samplesModal' }); 
    this.getDoctorSamples(this.doctorDetailsSamplesPageIndex());
  }

  closeSamplesModal() {
    this.modalService.toggle({ show: false, id: 'samplesModal' }); 
    if (this.previousModalId) {
      this.modalService.toggle({ show: true, id: this.previousModalId }); 
    }
    this.previousModalId = null; 
  }

  onSamplesModalClose(isVisible: boolean) {
  if (!isVisible && this.previousModalId) {
    this.modalService.toggle({ show: true, id: this.previousModalId });
    this.previousModalId = null;
  }
}

  onSalesModalClose(isVisible: boolean) {
    if (!isVisible && this.previousModalId) {
      this.modalService.toggle({ show: true, id: this.previousModalId });
      this.previousModalId = null;
    }
  }


showSalesModal(triggeredFromModalId: string) {
  this.previousModalId = triggeredFromModalId;
  this.modalService.toggle({ show: false, id: triggeredFromModalId });
  this.modalService.toggle({ show: true, id: 'salesModal' }); 
  this.getDoctorSales(this.doctorDetailsSalesPageIndex());
}

closeSalesModal() {
  this.modalService.toggle({ show: false, id: 'salesModal' });
  if (this.previousModalId) {
    this.modalService.toggle({ show: true, id: this.previousModalId });
  }
}

salesColumns : IColumn[] = [
   { key: 'medRepName', label: 'المندوب', _style: { width: '25%' } },
  { key: 'visitDate', label: 'تاريخ الطلب', _style: { width: '25%' } },
  { key: 'activityDate', label: 'تاريخ النشاط', _style: { width: '25%' } },
  { key: 'activityType', label: 'النشاط', _style: { width: '20%' } },
  { key: 'cost', label: 'التكلفة', _style: { width: '10%' } },
];


// Data for visits modal
visitsColumns : IColumn[] = [
  { key: 'medRepName', label: 'المندوب', _style: { width: '25%' } },
  { key: 'visitDate', label: 'تاريخ الزيارة', _style: { width: '20%' } },
];


showVisitsModal(triggeredFromModalId: string) {
  this.previousModalId = triggeredFromModalId;
  this.modalService.toggle({ show: false, id: triggeredFromModalId });
  this.modalService.toggle({ show: true, id: 'visitsModal' });
  this.getDoctorVisits(this.doctorDetailsVisitsPageIndex());
}

closeVisitsModal() {
  this.modalService.toggle({ show: false, id: 'visitsModal' });
  if (this.previousModalId) {
    this.modalService.toggle({ show: true, id: this.previousModalId });
  }
}

  onVisitsModalClose(isVisible: boolean) {
    if (!isVisible && this.previousModalId) {
      this.modalService.toggle({ show: true, id: this.previousModalId });
      this.previousModalId = null;
    }
  }

  getDoctorVisits(pageIdx : number): void {
    const request: IDoctorExtraDetailsRequest = {
      filter: { doctorId: this.doctorDetails().id },
      pageIndex: pageIdx,
      pageSize: 5,
    };

    this._dashboardSvc.getDoctorVisit(request).subscribe({
      next: (res) => {
        this.doctorExtraDetailsResponse.set(res);
        this.doctorDetailsVisitsLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load doctor visits', err);
      },
    });
  }

  getDoctorSamples(pageIdx : number): void {
     const request: IDoctorExtraDetailsRequest = {
      filter: { doctorId: this.doctorDetails().id },
      pageIndex: pageIdx,
      pageSize: 5,
    };
    this._dashboardSvc.getDoctorSamples(request).subscribe({
      next: (res) => {
        this.doctorExtraDetailsResponse.set(res);
        this.doctorDetailsSamplesLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load doctor samples', err);
      },
    });
  }

  getDoctorSales(pageIdx : number): void {
     const request: IDoctorExtraDetailsRequest = {
      filter: { doctorId: this.doctorDetails().id },
      pageIndex: pageIdx,
      pageSize: 5,
    };
    this._dashboardSvc.getDoctorSales(request).subscribe({
      next: (res) => {
        this.doctorExtraDetailsResponse.set(res);
        this.doctorDetailsSalesLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load doctor sales', err);
      },
    });
  }
}
