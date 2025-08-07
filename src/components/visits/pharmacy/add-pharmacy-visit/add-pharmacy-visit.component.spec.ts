import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPharmacyVisitComponent } from './add-pharmacy-visit.component';

describe('AddPharmacyVisitComponent', () => {
  let component: AddPharmacyVisitComponent;
  let fixture: ComponentFixture<AddPharmacyVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPharmacyVisitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPharmacyVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
