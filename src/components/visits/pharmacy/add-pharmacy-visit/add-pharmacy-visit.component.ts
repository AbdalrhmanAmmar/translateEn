import { Component, inject, OnInit, signal, WritableSignal, computed, effect } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormArray, ValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// CoreUI Imports
import { 
  ButtonDirective,
  CardComponent,
  ColComponent,
  DatePickerComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormModule,
  FormSelectDirective,
  RowComponent,
  SmartTableModule,
  TemplateIdDirective,
  IColumn,
  CardModule,
} from '@coreui/angular-pro';
import { IconDirective } from '@coreui/icons-angular';
import { cilCalendar, cilCart, cilCloudUpload, cilDollar, cilInfo, cilMedicalCross, cilMoney, cilSave } from '@coreui/icons';

// Services
import { LookupsService } from '../../../../core/services/modules-services/lookups.service';
import { SalesService } from './../../../../core/services/modules-services/sales.service';
import { NotificationService } from '../../../../core/services/helper-services/notification.service';

// Interfaces
import { 
  IOptions, 
  IPharmacy, 
  IPharmacyProduct, 
  IPharmacyVisit, 
  IPharmacyVisitProduct,
} from '../../../../core/interfaces/isale';
import { IPharmacyVisitFormLookup } from '../../../../core/interfaces/ilookup';

@Component({
  selector: 'app-add-pharmacy-visit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    
    // CoreUI Components
    CardComponent,
    CardModule,
    IconDirective,
    ColComponent,
    RowComponent,
    DatePickerComponent,
    FormModule,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    SmartTableModule,
    TemplateIdDirective,
    ButtonDirective
  ],
  templateUrl: './add-pharmacy-visit.component.html',
  styleUrl: './add-pharmacy-visit.component.scss'
})
export class AddPharmacyVisitComponent implements OnInit {
  // Services
  private readonly salesService = inject(SalesService);
  private readonly lookupsService = inject(LookupsService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  // Date Configuration
  minDate: Date = new Date(new Date().setDate(new Date().getDate() - 3));
  maxDate: Date = new Date();

  // Form State
  form!: FormGroup;
  readonly selectedProducts = signal<IPharmacyProduct[]>([]);
  readonly pharmacyVisitFormLookups = signal<IPharmacyVisitFormLookup>({} as IPharmacyVisitFormLookup);

  // Computed Properties
  readonly totalCost = computed(() => 
    this.selectedProducts().reduce((sum, p) => sum + ((p.price ?? 0) * (p.amount ?? 0)), 0)
  );

  // UI Configuration
  readonly columns: IColumn[] = [
    { key: 'name', label: 'المنتج', filter: true, sorter: true },
    { key: 'price', label: 'السعر', filter: true, sorter: true },
    { key: 'amount', label: 'الكمية', filter: true, sorter: true },
    { key: 'total', label: 'المجموع', filter: true, sorter: true },
  ];

  readonly items: IPharmacy[] = [
    { id: 1, label: 'توزيع درافت', name: 'driftDistribution' },
    { id: 2, label: 'زيارة تعريفية', name: 'introVisit' },
    { id: 3, label: 'طلبية', name: 'request' },
    { id: 4, label: 'تحصيل', name: 'collection' },
  ];

  readonly options: IOptions[] = [
    { label: 'نعم', value: true },
    { label: 'لا', value: false },
  ];

  readonly icons = { 
    cilCalendar, 
    cilMedicalCross, 
    cilSave, 
    cilCloudUpload, 
    cilInfo, 
    cilMoney, 
    cilCart, 
    cilDollar 
  };

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormListeners();
    this.loadLookups();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      visitDate: [null, Validators.required],
      invoiceNumber: [''],
      totalCost: [null],
      collectionAmount: [null],
      invoiceImageUrl: [''],
      isDraftDist: [false],
      isRequest: [false],
      isCollection: [false],
      isIntroductoryVisit: [false],
      introductoryVisitNotes: [''],
      introductoryVisitImageUrl: [''],
      pharmacyId: [null, Validators.required],
      pharmacyVisitProducts: this.fb.array([]),
    });
  }

  private setupFormListeners(): void {
    // Introductory Visit Listeners
    this.form.get('isIntroductoryVisit')!.valueChanges.subscribe((checked: boolean) => {
      this.toggleFieldValidators(
        ['introductoryVisitNotes', 'introductoryVisitImageUrl'],
        checked
      );
    });

 // In setupFormListeners():
this.form.get('isCollection')!.valueChanges.subscribe((checked: boolean) => {
  this.toggleFieldValidators(
    ['totalCost', 'invoiceNumber', 'invoiceImageUrl'],
    checked,
    [Validators.required],
    {
      'collectionAmount': [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]
    }
  );
});

    this.form.get('isRequest')!.valueChanges.subscribe((checked: boolean) => {
      this.toggleFieldValidators(['totalCost'], checked, [Validators.required], {
        'totalCost': [Validators.required, Validators.min(1)]
      });
    });
}

 private toggleFieldValidators(
  fields: string[],
  enabled: boolean,
  defaultValidators: ValidatorFn[] = [Validators.required],
  customValidators: {[key: string]: ValidatorFn[]} = {}
): void {
  fields.forEach(field => {
    const control = this.form.get(field)!;
    if (enabled) {
      control.setValidators(customValidators[field] || defaultValidators);
    } else {
      control.clearValidators();
    }
    control.updateValueAndValidity();
  });
}
  private loadLookups(): void {
    this.lookupsService.getPharmacyVisitFormLookups().subscribe({
      next: (res) => this.pharmacyVisitFormLookups.set(res),
      error: (err) => NotificationService.fireNotification('Failed to load form data', false)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      NotificationService.fireNotification('Please fill all required fields', false);
      return;
    }

    const payload = this.createPayload();
    this.salesService.addPharmacyVisit(payload).subscribe({
      next: () => this.handleSuccess(),
      error: (err) => this.handleError(err)
    });
  }

  private createPayload(): IPharmacyVisit {
    const raw = this.form.value;
    return {
      visitDate: (raw.visitDate as Date).toLocaleDateString('sv-SE'),
      invoiceNumber: raw.invoiceNumber,
      totalCost: +raw.totalCost,
      invoiceImageUrl: raw.invoiceImageUrl,
      isDraftDist: !!raw.isDraftDist,
      isRequest: !!raw.isRequest,
      isCollection: !!raw.isCollection,
      isIntroductoryVisit: !!raw.isIntroductoryVisit,
      introductoryVisitNotes: raw.introductoryVisitNotes,
      introductoryVisitImageUrl: raw.introductoryVisitImageUrl,
      pharmacyId: +raw.pharmacyId,
      pharmacyVisitProducts: this.createVisitProducts(),
      collectionAmount: raw.collectionAmount
    };
  }

  private createVisitProducts(): IPharmacyVisitProduct[] {
    return this.selectedProducts().map(product => ({
      productId: product.id,
      quantity: product.amount ?? 0,
    }));
  }

  private handleSuccess(): void {
    NotificationService.fireNotification('تم تسجيل الزيارة بنجاح');
    this.clearForm();
    this.router.navigate(['/pharmacy-visits']);
  }

  private handleError(error: any): void {
    NotificationService.fireNotification('حدث خطأ أثناء حفظ البيانات', false);
    console.error('Error submitting form:', error);
  }

 onSelectedItemsChange(rowSelected: IPharmacyProduct[]) {
  this.selectedProducts.set(rowSelected.filter((e: any) => e._selected))
   const total = this.selectedProducts().reduce((sum, p) => {
    return sum + ((p.price ?? 0) * (p.amount ?? 0));
  }, 0);

  this.form.get('totalCost')?.setValue(total);
}

updateAmount(item: IPharmacyProduct, event: Event): void {
  const input = event.target as HTMLInputElement;
  const value = +input.value;

  item.amount = value;
  item.total = (item.price ?? 0) * value;

  const total = this.selectedProducts().reduce((sum, p) => {
    return sum + ((p.price ?? 0) * (p.amount ?? 0));
  }, 0);

  this.form.get('totalCost')?.setValue(total);
}

  optionSelected(itemId: number, optionValue: boolean): void {
    const controlMap: {[key: number]: string} = {
      1: 'isDraftDist',
      2: 'isIntroductoryVisit',
      3: 'isRequest',
      4: 'isCollection'
    };
    
    if (controlMap[itemId]) {
      this.form.get(controlMap[itemId])?.setValue(optionValue === true);
    }
  }

  trackByProductId(index: number, item: IPharmacyProduct): number {
    return item.id;
  }

  clearForm(): void {
    this.form.reset({
      isDraftDist: false,
      isRequest: false,
      isCollection: false,
      isIntroductoryVisit: false
    });
    this.selectedProducts.set([]);
  }
}