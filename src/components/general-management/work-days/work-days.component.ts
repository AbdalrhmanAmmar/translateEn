import { Component, signal, ChangeDetectorRef, ViewEncapsulation, ViewChild, inject, OnInit, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { IconModule } from '@coreui/icons-angular';
import {
  ButtonModule,
  CardModule,
  FormModule,
  FormCheckInputDirective,
  FormCheckComponent,
  GridModule,
  InputGroupComponent,
  ModalModule,
  TimePickerModule,
  DatePickerModule,
  ModalComponent,
  SpinnerModule,
  FormCheckLabelDirective,
} from '@coreui/angular-pro';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DayOfWeekEnum, IAddHoliday, IAddWorkDaySettings, IWorkDaySettings } from '../../../core/interfaces/igeneral-management';
import { GeneralManagementService } from '../../../core/services/modules-services/general-management.service';
import { NotificationService } from '../../../core/services/helper-services/notification.service';
import { DatesSetArg } from '@fullcalendar/core';

@Component({
  selector: 'app-work-days',
  imports: [CommonModule, FullCalendarModule, ButtonModule, CardModule, GridModule, IconModule, ModalModule, CommonModule,
    FormsModule,
    FormModule,
    ButtonModule,
    CardModule,
    GridModule,
    ReactiveFormsModule,
    FormModule,
    FormCheckComponent,
    FormCheckLabelDirective,
    FormCheckInputDirective,
    InputGroupComponent,
    SpinnerModule,
    CommonModule,
    IconModule,
  FormCheckComponent,
TimePickerModule,
DatePickerModule],
  templateUrl: './work-days.component.html',
  styleUrl: './work-days.component.scss'
})
export class WorkDaysComponent implements OnInit {

  // ---------------------------- Injections ----------------------------
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _generalManagementService = inject(GeneralManagementService);

  // ---------------------------- Variables ----------------------------
  holidayForm : FormGroup = this._FormBuilder.group({
    holidayName: [null, Validators.required],
    holidayDate: [null, Validators.required],
    holidayType: [null, Validators.required],
    holidayRepetitiveness: [null]
  });

  @ViewChild('addHolidayModal', { static: true }) addHolidayModal!: ModalComponent;
  @ViewChild('removeHolidayModal', { static: true }) removeHolidayModal!: ModalComponent;
  @ViewChild('settingsModal', { static: true }) settingsModal!: ModalComponent;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  pendingRemovalEvent!: EventApi;

  timeTo = new Date();
  timeFrom = new Date();
  selectedHolidayDateToAdd = new Date();
  selectedHolidayIdToRemove!: number;
  calendarLoading: WritableSignal<boolean> = signal(false);

  daysOfWeek = [
    { id: DayOfWeekEnum.Saturday, label: 'السبت' },
    { id: DayOfWeekEnum.Sunday, label: 'الأحد' },
    { id: DayOfWeekEnum.Monday, label: 'الإثنين' },
    { id: DayOfWeekEnum.Tuesday, label: 'الثلاثاء' },
    { id: DayOfWeekEnum.Wednesday, label: 'الأربعاء' },
    { id: DayOfWeekEnum.Thursday, label: 'الخميس' },
    { id: DayOfWeekEnum.Friday, label: 'الجمعة' },
  ];

 weekDaysControls = this.daysOfWeek.map(() => this._FormBuilder.control(false));

 weeklyHolidayForm: FormGroup = this._FormBuilder.group({
    weekDays: this._FormBuilder.array(this.weekDaysControls),
    fromTime: [''],
    toTime: [''],
     validators: [ eitherWeekdaysOrTimes ]
  });

  workDaysCount : WritableSignal<number> = signal(0);
  holidayDaysCount : WritableSignal<number> = signal(0);
  totalDaysCount : WritableSignal<number> = signal(0);

  settings = {
    offDays: {
      sun: false,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
    },
    startTime: '08:00',
    endTime: '17:00',
  };

  calendarVisible = signal(true);

  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    headerToolbar: {
      left:  'next',  
      center:'title', 
      right: 'prev' ,
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    displayEventTime: false,
    dayMaxEvents: true,
    fixedWeekCount : false,
    showNonCurrentDates: false,
    firstDay: 6,
    locale: 'ar',
    height: 'auto',
    direction: 'rtl',
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    datesSet: this.handleDatesSet.bind(this),
  });
  
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }
  ngOnInit(): void {
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }
 
  handleDateSelect(selectInfo: DateSelectArg) {
   this.addHolidayModal.visible = true;
   this.selectedHolidayDateToAdd = selectInfo.start;
     this.holidayForm.patchValue({
      holidayDate: selectInfo.start,
    })
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (clickInfo.event.extendedProps['weeklyHoliday']) {
      return;
    }
    this.pendingRemovalEvent = clickInfo.event;
    this.selectedHolidayIdToRemove = +clickInfo.event.id; 
    this.removeHolidayModal.visible = true;
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }

 confirmRemove() {
    if (!this.pendingRemovalEvent) {
      return;
    }

    this.pendingRemovalEvent.remove();
    this.removeHolidayModal.visible = false;

    this._generalManagementService
      .deleteHoliday(this.selectedHolidayIdToRemove) 
      .subscribe({
        next: () => {
          NotificationService.fireNotification('تم حذف العطلة بنجاح');
          this.refreshCalendar();
        },
        error: (err) => {
          console.error(err);
        }
      });

    this.pendingRemovalEvent = undefined!;
    this.selectedHolidayIdToRemove = 0;
  }

   private handleDatesSet(arg: DatesSetArg) {
    const monthNumber = arg.start.getMonth() + 1;
    const yearNumber = arg.start.getFullYear();
    this.getHolidays(monthNumber, yearNumber);
    console.log('Dates set:', monthNumber, yearNumber);
  }

  cancelRemove() {
    this.removeHolidayModal.visible = false;
  }

  addHoliday() {
      const formValue = this.holidayForm.value;
      const rawDate: Date = formValue.holidayDate;

      const utcMidnight = new Date(Date.UTC(
        rawDate.getFullYear(),
        rawDate.getMonth(),
        rawDate.getDate(),
      ));

      const newHoliday: IAddHoliday = {
        holidayName: formValue.holidayName,
        holidayDate: new Date(formValue.holidayDate).toISOString().split('T')[0],
        holidayType: +formValue.holidayType,
      };

      this.addHolidayModal.visible = false;
      this.holidayForm.reset();

      this._generalManagementService.addHoliday(newHoliday).subscribe({
        next: (res : number) => {
          NotificationService.fireNotification('تم اضافة العطلة بنجاح');
          this.refreshCalendar();
        },
        error: (err) => {
        }
      });
  }

  getHolidays(month: number, year : number) {
    this._generalManagementService.getHolidays(month, year).subscribe({
      next: (res) => {
        this.calendarOptions.update(options => ({
          ...options,
          events: res.holidays.map((holiday, idx) => ({
            id: holiday.id === 0
      ? `weekly-${idx}`
      : holiday.id.toString(),
            title: holiday.holidayName,
            date: holiday.holidayDate,
            extendedProps: {
              weeklyHoliday: holiday.id === 0,
            },
          })),
        }));

      this.workDaysCount.set(res.workDaysCount);
      this.holidayDaysCount.set(res.holidaysCount);
      this.totalDaysCount.set(res.totalDaysCount);
      },
      error: (err) => {
      }
    });
  }

  addWeeklyHoliday() {
    const selectedDays = this.weekDaysControls
      .map((ctrl, idx) => (ctrl.value ? this.daysOfWeek[idx].id : null))
      .filter((d): d is number => d !== null);


    this._generalManagementService.addWeekHoliday(selectedDays)
      .subscribe({
        next: () => {
          this.settingsModal.visible = false;
          NotificationService.fireNotification('تم اضافة العطلة الاسبوعية بنجاح');
          this.refreshCalendar();
        },
        error: err => {
        }
      });
  }

   get weekDaysArray(): FormArray {
    return this.weeklyHolidayForm.get('weekDays') as FormArray;
  }

  trackById(_: number, day: { id: number }) {
    return day.id;
  }

  toTimeOnlyString(date: Date): string {
    const pad2 = (n: number) => n.toString().padStart(2, '0');
    const ticks = date.getMilliseconds() * 10_000;
    const frac7 = ticks.toString().padStart(7, '0');  
    return [
      pad2(date.getHours()),
      pad2(date.getMinutes()),
      pad2(date.getSeconds())
    ].join(':')  
    + '.'  
    + frac7;
  }

  refreshCalendar() {
      const calApi = this.calendarComponent.getApi();
      const monthNum = calApi.getDate().getMonth() + 1;
      const yearNum = calApi.getDate().getFullYear();
      this.getHolidays(monthNum, yearNum);
  }
}

export function minSelectedCheckboxes(min: number = 1): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const arr = control as FormArray;
    const selectedCount = arr.controls
      .map(c => c.value)
      .reduce((sum, cur) => cur ? sum + 1 : sum, 0);
    return selectedCount >= min
      ? null
      : { required: true };
  };
}

export const eitherWeekdaysOrTimes: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const arr = group.get('weekDays') as FormArray;
  const anyDay   = arr.controls.some(c => c.value === true);
  const fromTime = !!group.get('fromTime')?.value;
  const toTime   = !!group.get('toTime')?.value;
  return (anyDay || (fromTime && toTime))
    ? null
    : { eitherWeekdaysOrTimes: true };
};