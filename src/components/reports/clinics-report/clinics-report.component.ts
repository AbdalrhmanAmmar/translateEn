import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonModule,
  CardModule,
  ColComponent,
  DatePickerComponent,
  FormModule,
  IColumn,
  IItem,
  InputGroupComponent,
  ModalModule,
  RowComponent,
  SmartTableModule,
  SpinnerModule,
} from '@coreui/angular-pro';
import {
  cilBlurCircular,
  cilCalendar,
  cilChart,
  cilClock,
  cilGroup,
  cilZoom,
} from '@coreui/icons';
import { ReportsService } from '../../../core/services/modules-services/reports.service';
import { ActualVisits, ActualWorkDays, DaysWithoutReports, DoctorsWithoutVisits, ICompletedVisitReportDto, ICompletedWorkDayReportDto, IDayWithoutReportDto, IDoctorWithoutVisitsReportDto, IGetReportRequest, IMissedVisitReportDto, IReportPagedSearchRequest, IReports, ISegmentFilter, ISegmentVisitReportDto, ISegmentVisits, MissedVisits } from '../../../core/interfaces/ireport';
import { CommonModule } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
@Component({
  selector: 'app-clinics-report',
    imports: [
    CommonModule,
    DatePickerComponent,
    ColComponent,
    RowComponent,
    FormModule,
    FormsModule,
    InputGroupComponent,
    CardModule,
    IconDirective,
    ReactiveFormsModule,
    ModalModule,
    ButtonModule,
    SmartTableModule,
    SpinnerModule
  ],
  templateUrl: './clinics-report.component.html',
  styleUrl: './clinics-report.component.scss'
})
export class ClinicsReportComponent implements OnInit {
  //========> Modals
  @ViewChild('doctorsWithoutVisitsModal', { static: true }) doctorsWithoutVisitsModal!: ModalModule;
  @ViewChild('completedVisitsModal', { static: true }) completedVisitsModal!: ModalModule;
  @ViewChild('missedVisitsModal', { static: true }) missedVisitsModal!: ModalModule;
  @ViewChild('completedWorkDaysModal', { static: true }) completedWorkDaysModal!: ModalModule;
  @ViewChild('daysWithoutReportsModal', { static: true }) daysWithoutReportsModal!: ModalModule;
  @ViewChild('segmentBVisitsModal', { static: true }) segmentBVisitsModal!: ModalModule;
  @ViewChild('segmentAVisitsModal', { static: true }) segmentAVisitsModal!: ModalModule;

  //========> Injections
  private readonly _ReportsService = inject(ReportsService);

  //========> Variables
  reportsData: WritableSignal<IReports> = signal<IReports>({} as IReports);
  reportsLoading: WritableSignal<boolean> = signal<boolean>(true);
  fromDateControl = new FormControl<Date | null>(null);
  toDateControl = new FormControl<Date | null>(null);
  loading: boolean = false;
  fromMaxDate: Date = new Date(new Date().setDate(new Date().getDate()));
  toMinDate: Date = new Date(new Date().setDate(new Date().getDate()));
  toMaxDate: Date = new Date(new Date().setMonth(new Date().getMonth()));
  activeModal: string | null = null;
  
  //========> Hooks
  ngOnInit(): void {
    this.loadDefaultData();
    this.fromDateControl.valueChanges.subscribe((date: Date | null) => {
      if (date) {
        this.toMinDate = new Date(new Date(date).setDate(date.getDate() - 1));
        this.onDateChange(date, this.toDateControl.value!);
      }
    });
    this.toDateControl.valueChanges.subscribe((date: Date | null) => {
      if (date) {
        this.onDateChange(this.fromDateControl.value!, date);
      }
    });
  }
  //========> Methods
  loadDefaultData(): void {
    this.fromDateControl.setValue(new Date(new Date().setMonth(new Date().getMonth() - 1)));
    this.toDateControl.setValue(new Date(new Date().setMonth(new Date().getMonth())));
    this.onDateChange(this.fromDateControl.value!, this.toDateControl.value!);
  }

  onDateChange(fromDate: Date, toDate: Date): void {
    const request: IGetReportRequest = {
      fromDate: fromDate,
      toDate: toDate,
    };
    if (request) {
      this._ReportsService.getReports(request).subscribe({
        next: (res) => {
          this.reportsData.set(res);
          this.reportsLoading.set(false);
        },
      });
    }
  }

  //*========> Icons
  icons = {
    cilGroup,
    cilBlurCircular,
    cilClock,
    cilCalendar,
    cilZoom,
    cilChart
  };

  closeModal(): void {
    this.activeModal = null;
  }

  modalVisibleChange(isOpen: boolean, modalId: string): void {
    if (!isOpen) {
      this.activeModal = null;
    } else {
      this.activeModal = modalId;
    }
  }


  getPercentage(value: string): number {
    return parseFloat(value.replace('%', '')) || 0;
  }

  getProgressColor(percentage: number): string {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'info';
    if (percentage >= 40) return 'warning';
    return 'danger';
  }
 

  isDoctorsWithoutVisitsModalLoading: WritableSignal<boolean> = signal<boolean>(true);
  isCompletedVisitsModalLoading: WritableSignal<boolean> = signal<boolean>(true);
  isMissedVisitsModalLoading: WritableSignal<boolean> = signal<boolean>(true);
  isCompletedWorkDaysModalLoading: WritableSignal<boolean> = signal<boolean>(true);
  isDaysWithoutReportsModalLoading: WritableSignal<boolean> = signal<boolean>(true);
  isSegmentAVisitsModalLoading: WritableSignal<boolean> = signal<boolean>(true);
  isSegmentBVisitsModalLoading: WritableSignal<boolean> = signal<boolean>(true);

  doctorsWithoutVisits: WritableSignal<IDoctorWithoutVisitsReportDto[]> = signal<IDoctorWithoutVisitsReportDto[]>([]);
  completedVisits: WritableSignal<ICompletedVisitReportDto[]> = signal<ICompletedVisitReportDto[]>([]);
  missedVisits: WritableSignal<IMissedVisitReportDto[]> = signal<IMissedVisitReportDto[]>([]);
  completedWorkDays: WritableSignal<ICompletedWorkDayReportDto[]> = signal<ICompletedWorkDayReportDto[]>([]);
  daysWithoutReports: WritableSignal<IDayWithoutReportDto[]> = signal<IDayWithoutReportDto[]>([]);
  segmentVisits: WritableSignal<ISegmentVisitReportDto[]> = signal<ISegmentVisitReportDto[]>([]);

  openModal(modalId: string, segment: string = ''): void {
    this.activeModal = modalId;
    switch (modalId) {
      case 'doctorsWithoutVisitsModal':
        this.getDoctorsWithoutVisits();
        break;
      case 'completedVisitsModal':
        this.getCompletedVisits();
        break;
      case 'missedVisitsModal':
        this.getMissedVisits();
        break;
      case 'completedWorkDaysModal':
        this.getCompletedWorkDays();
        break;
      case 'daysWithoutReportsModal':
        this.getDaysWithoutReports();
        break;
      case 'segmentAVisitsModal':
        this.getSegmentVisits(segment);
        break;
      case 'segmentBVisitsModal':
        this.getSegmentVisits(segment);
    }
  }

  doctorsWithoutVisitsColumns: (IColumn | string)[] = [
    {
      key: 'doctorName',
      label: 'الدكتور',
      _props: {  class: 'fw-bold' },
    },
    {
      key: 'organizationName',
      label: 'الجهة',
      _props: { class: 'fw-bold' }
    },
    {
      key: 'city',
      label: 'المدينة',
      _props: { class: 'fw-bold' }
    },
    {
      key: 'area',
      label: 'المنطقة',
      _props: { class: 'fw-bold' },
      filter: true,
      sorter: true
    },
    {
      key: 'district',
      label: 'الحي',
      _props: { class: 'fw-bold' },
      filter: true,
      sorter: true
    }
  ];

  completedVisitsColumns: (IColumn | string)[] = [
    {
      key: 'medRepName',
      label: 'المندوب',
       
      _props: {  class: 'fw-bold' },
    },
    {
      key: 'clinicVisitDate',
      label: 'التاريخ',
       
      _props: { class: 'fw-bold' }
    },
    {
      key: 'doctorName',
      label: 'الدكتور',
      
      _props: { class: 'fw-bold' }
    }
  ];

  missedVisitsColumns: (IColumn | string)[] = [
    {
      key: 'medRepName',
      label: 'المندوب',
       
      _props: {  class: 'fw-bold' },
    },
    {
      key: 'doctorId',
      label: 'التاريخ',
       
      _props: { class: 'fw-bold' }
    },
    {
      key: 'doctorName',
      label: 'الدكتور',
      
      _props: { class: 'fw-bold' }
    }
  ];

  completedWorkDaysColumns: (IColumn | string)[] = [
    {
      key: 'clinicVisitDate',
      label: 'اليوم',
       
      _props: {  class: 'fw-bold' },
    },
    {
      key: 'medRepName',
      label: 'المندوب',
       
      _props: { class: 'fw-bold' }
    },
    {
      key: 'doctorName',
      label: 'الدكتور',
      
      _props: { class: 'fw-bold' }
    }
  ];

  daysWithoutReportsColumns: (IColumn | string)[] = [
    {
      key: 'day',
      label: 'اليوم',
       
      _props: {  class: 'fw-bold' },
    },
    {
      key: 'date',
      label: 'التاريخ',
       
      _props: {  class: 'fw-bold' },
    },
  ];

  segmentVisitsColumns: (IColumn | string)[] = [
    {
      key: 'medRepName',
      label: 'المندوب',
       
      _props: {  class: 'fw-bold' },
    },
    {
      key: 'clinicVisitDate',
      label: 'التاريخ',
       
      _props: { class: 'fw-bold' }
    },
    {
      key: 'doctorName',
      label: 'الدكتور',
      
      _props: { class: 'fw-bold' }
    }
  ];

  getDoctorsWithoutVisits(){
    const request: IGetReportRequest = {
      fromDate: this.fromDateControl.value!,
      toDate: this.toDateControl.value!,
    };
    this.isDoctorsWithoutVisitsModalLoading.set(true);
    return this._ReportsService.getDoctorsWithoutVisits(request).subscribe({
      next: (res) => {
        this.doctorsWithoutVisits.set(res);
        this.isDoctorsWithoutVisitsModalLoading.set(false);
      } 
    });
  }

  getCompletedVisits(){
    const request: IGetReportRequest = {
      fromDate: this.fromDateControl.value!,
      toDate: this.toDateControl.value!,
    };
    this.isCompletedVisitsModalLoading.set(true);
    return this._ReportsService.getCompletedVisits(request).subscribe({
      next: (res) => {
        this.completedVisits.set(res);
        this.isCompletedVisitsModalLoading.set(false);
      } 
    });
  }

  getMissedVisits(){
    const request: IGetReportRequest = {
      fromDate: this.fromDateControl.value!,
      toDate: this.toDateControl.value!,
    };
    this.isMissedVisitsModalLoading.set(true);
    return this._ReportsService.getMissedVisits(request).subscribe({
      next: (res) => {
        this.missedVisits.set(res);
        this.isMissedVisitsModalLoading.set(false);
      } 
    });
  }

  getCompletedWorkDays(){
    const request: IGetReportRequest = {
      fromDate: this.fromDateControl.value!,
      toDate: this.toDateControl.value!,
    };
    this.isCompletedWorkDaysModalLoading.set(true);
    return this._ReportsService.getCompletedWorkDays(request).subscribe({
      next: (res) => {
        this.completedWorkDays.set(res);
        this.isCompletedWorkDaysModalLoading.set(false);
      } 
    });
  }

  getDaysWithoutReports(){
    const request: IGetReportRequest = {
      fromDate: this.fromDateControl.value!,
      toDate: this.toDateControl.value!,
    };
    this.isDaysWithoutReportsModalLoading.set(true);
    return this._ReportsService.getDaysWithoutReports(request).subscribe({
      next: (res) => {
        this.daysWithoutReports.set(res);
        this.isDaysWithoutReportsModalLoading.set(false);
      } 
    });
  }

  getSegmentVisits(segment: string): void {
    const request: IReportPagedSearchRequest<ISegmentFilter> = {
      filter: {
        fromDate: this.fromDateControl.value!,
        toDate: this.toDateControl.value!,
        segment: segment,
      },
      pageIndex: 1,
      pageSize: 10,
    };
    segment == 'A' ? this.isSegmentAVisitsModalLoading.set(true) : this.isSegmentBVisitsModalLoading.set(true);
    this._ReportsService.getSegmentVisits(request).subscribe({
      next: (res) => {
        this.segmentVisits.set(res.items);
        segment == 'A' ? this.isSegmentAVisitsModalLoading.set(false) : this.isSegmentBVisitsModalLoading.set(false);
      } 
    });
  }
}
