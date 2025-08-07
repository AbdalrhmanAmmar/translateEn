import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ButtonDirective,
  CardComponent,
  ColComponent,
  DatePickerComponent,
  FormModule,
  FormSelectDirective,
  InputGroupComponent,
  RowComponent,
  SpinnerModule,
} from '@coreui/angular-pro';
import {
  cilCalendar,
  cilDescription,
  cilDollar,
  cilFile,
  cilSave,
  cilUser,
} from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ISalesResponse } from '../../../core/interfaces/icollection';
import { RequestsService } from './../../../core/services/modules-services/requests.service';
import { LookupsService } from '../../../core/services/modules-services/lookups.service';
import { NotificationService } from '../../../core/services/helper-services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sale',
  imports: [
    RowComponent,
    ColComponent,
    DatePickerComponent,
    CardComponent,
    ReactiveFormsModule,
    FormsModule,
    IconDirective,
    InputGroupComponent,
    FormModule,
    FormSelectDirective,
    ButtonDirective,
    CommonModule,
    SpinnerModule
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss',
})
export class SaleComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _RequestsService = inject(RequestsService);
  private readonly _LookupsService = inject(LookupsService);
  salesData: WritableSignal<ISalesResponse> = signal({} as ISalesResponse);
   formLoading: WritableSignal<boolean> = signal(true);
  ngOnInit(): void {
    this.getSalesData();
  }

  icons = {
    cilCalendar,
    cilFile,
    cilUser,
    cilDollar,
    cilDescription,
    cilSave,
  };

  currentDate: Date = new Date(); 

  submitSaleForm: FormGroup = this._FormBuilder.group({
    requestDate: [this.currentDate],
    saleDate: [null, Validators.required],
    cost: [null, Validators.required],
    notes: [null],
    doctorId: [null, Validators.required],
    saleTypeId: [null, Validators.required],
  });

  onSubmitForm(): void {
    if (this.submitSaleForm.invalid) {
      this.submitSaleForm.markAllAsTouched();
      return;
    }

    if (this.submitSaleForm.valid) {
      const value = this.submitSaleForm.value;
      this._RequestsService.addSalesRequests(value).subscribe({
        next: (res) => {
          this.submitSaleForm.reset();
          NotificationService.fireNotification("تم تقديم الطلب بنجاح");
        },
      });
    }
  }

  getSalesData(): void {
    this._LookupsService.getSalesData().subscribe({
      next: (res) => {
        this.salesData.set(res);
        this.formLoading.set(false);
      },
    });
  }
}
