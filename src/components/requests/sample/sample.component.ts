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
  cilAlignCenter,
  cilCalendar,
  cilDescription,
  cilMedicalCross,
  cilSave,
  cilUser,
} from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ISamplesResponse } from '../../../core/interfaces/icollection';
import { RequestsService } from '../../../core/services/modules-services/requests.service';
import { LookupsService } from '../../../core/services/modules-services/lookups.service';
import { NotificationService } from '../../../core/services/helper-services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sample',
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
  templateUrl: './sample.component.html',
  styleUrl: './sample.component.scss',
})
export class SampleComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _RequestsService = inject(RequestsService);
  private readonly _LookupsService = inject(LookupsService);
  samplesData: WritableSignal<ISamplesResponse> = signal(
    {} as ISamplesResponse
  );

    formLoading: WritableSignal<boolean> = signal(true);


  ngOnInit(): void {
    this.getSamplesData();
  }

  icons = {
    cilCalendar,
    cilMedicalCross,
    cilUser,
    cilAlignCenter,
    cilDescription,
    cilSave,
  };

  currentDate: Date = new Date();

  submitSampleForm: FormGroup = this._FormBuilder.group({
    requestDate: [this.currentDate],
    deliveryDate: [null, Validators.required],
    amount: [null, Validators.required],
    productId: [null, Validators.required],
    doctorId: [null, Validators.required],
    notes: [null],
  });

  onSubmitForm(): void {
    if (this.submitSampleForm.invalid) {
      this.submitSampleForm.markAllAsTouched();
      return;
    }
    if (this.submitSampleForm.valid) {
      const value = this.submitSampleForm.value;
      this._RequestsService.addSamplesRequests(value).subscribe({
        next: (res) => {
          this.submitSampleForm.reset();
          NotificationService.fireNotification("تم تقديم الطلب بنجاح");
        },
      });
    }
  }

  getSamplesData(): void {
    this._LookupsService.getSamplesData().subscribe({
      next: (res) => {
        this.samplesData.set(res);
        this.formLoading.set(false);
      },
    });
  }
}
