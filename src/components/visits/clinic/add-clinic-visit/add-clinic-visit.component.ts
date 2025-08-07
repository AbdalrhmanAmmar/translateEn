import { Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  TooltipModule,
  TemplateIdDirective, 
  FormModule, 
  DropdownComponent,
  ColComponent,
  ButtonModule,
  InputGroupTextDirective,
  RowComponent, 
  TimePickerComponent, 
  CardModule,
  DatePickerComponent, 
  SpinnerModule} from '@coreui/angular-pro';

import {VisitsService} from '../../../../core/services/modules-services/visits.service'
import { IAddVisit, IVisitFormData } from '../../../../core/interfaces/ivisit';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {NotificationService} from '../../../../core/services/helper-services/notification.service'
import {LookupsService} from '../../../../core/services/modules-services/lookups.service'
import { IAddProductSample } from '../../../../core/interfaces/ivisit';
import { cilAlignCenter, cilBuilding, cilCalendar, cilDescription, cilEnvelopeClosed, cilMedicalCross, cilMinus, cilPlus, cilSave, cilUser } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { IClinicProductLookup, IClinicVisitFormLookup, ILookUp } from '../../../../core/interfaces/ilookup';
@Component({
  selector: 'app-add-clinic-visit',
  standalone: true,
  imports: [
    TooltipModule,
    ReactiveFormsModule,FormModule,
    ColComponent, 
    InputGroupTextDirective, 
    ButtonModule, 
    IconDirective,
    RowComponent, 
    CardModule,
    CommonModule,
    DatePickerComponent,
    SpinnerModule
  ],
  templateUrl: './add-clinic-visit.component.html',
  styleUrl: './add-clinic-visit.component.scss'
})
export class AddClinicVisitComponent implements OnInit {
 icons = { cilSave, cilUser , cilDescription, cilCalendar , cilBuilding , cilMedicalCross , cilAlignCenter , cilEnvelopeClosed, cilPlus, cilMinus};
  // -----------------Injections -------------------------
 private readonly visitsService = inject(VisitsService)
 private readonly LookupsService = inject(LookupsService)
 private readonly notificationService = inject(NotificationService)
 private readonly router = inject(Router);
 private readonly fb: FormBuilder = inject(FormBuilder);
 // ---------------------Globals--------------------------
 minDate: Date = new Date(new Date().setDate(new Date().getDate() - 3));
 maxDate : Date = new Date(new Date().setDate(new Date().getDate()));
 visitForm: FormGroup = this.fb.group({
  doctorId: [null, Validators.required],
  organizationId: [null, Validators.required],
  visitDate: [null, Validators.required],
  visitTime: [{ value: null, disabled: true }],
  hasSupervisor: [false],
  notes: [''],
  productBlocks: this.fb.array([
    this.createProductBlock()
  ])
});
 visit!: IAddVisit;
 visitFormData! : IClinicVisitFormLookup;

  formLoading: WritableSignal<boolean> = signal<boolean>(true);

 // ---------------------Constructor and Hooks--------------------------
 constructor() {}

  ngOnInit(): void {
   this.getVisitFormData();
}


 // ---------------------Methods--------------------------


  get productBlocks(): FormArray {
    return this.visitForm.get('productBlocks') as FormArray;
  }
  
createProductBlock(): FormGroup {
  const group = this.fb.group({
    productId: [null, Validators.required],
    samples: [null],
    messageId: [null, Validators.required],
    availableMessages: [[] as ILookUp<string>[]], 
  });

  // Listen to changes on productId
  group.get('productId')?.valueChanges.subscribe((productId: number | null) => {
    if (productId === null) {
      group.patchValue({
        availableMessages: [],
        messageId: null
      }, { emitEvent: false });
      return;
    }

    const selectedProduct = this.visitFormData?.products.find(p => p.id == productId);

    group.patchValue({
      availableMessages: selectedProduct?.messages || [],
      messageId: null
    }, { emitEvent: false });
  });

  return group;
}
  
  addProductBlock() {
    this.productBlocks.push(this.createProductBlock());
  }
  
  removeProductBlock(index: number) {
    this.productBlocks.removeAt(index);
  }
  
   getVisitFormData() : void
  {
    this.LookupsService.getClinicVisitFormLookups().subscribe((visitData : IClinicVisitFormLookup) => {
      this.visitFormData = visitData;
      this.formLoading.set(false);
    });
  }

 addVisit() : void
  {
     if (this.visitForm.invalid) {
    this.visitForm.markAllAsTouched();
    return;
  }

    const formValue = this.visitForm.getRawValue();
    
    const payload: IAddVisit = {
      doctorId: Number(formValue.doctorId),
      visitDate: (formValue.visitDate as Date).toLocaleDateString('sv-SE'),
      visitTime: this.getCurrentTime(),
      notes: formValue.notes,
      hasSupervisor: formValue.hasSupervisor,
      organizationId: Number(formValue.organizationId),
      productsSamples: formValue.productBlocks.map((block: any): IAddProductSample => ({
        productId: +block.productId,
        amount: +block.samples,
        messageId: Number(block.messageId)
        }))
      }
    
  
    this.visitsService.addVisit(payload).subscribe({
      next:  (res) => {
          NotificationService.fireNotification("تم اضافة زيارتك بنجاح")
         this.router.navigate(['/home']);
      }
    }
  );
  }

 getCurrentTime(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
}

}
