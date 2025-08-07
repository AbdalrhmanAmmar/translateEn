import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClinicVisitComponent } from './add-clinic-visit.component';

describe('AddClinicVisitComponent', () => {
  let component: AddClinicVisitComponent;
  let fixture: ComponentFixture<AddClinicVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClinicVisitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClinicVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
