import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciesReportComponent } from './pharmacies-report.component';

describe('PharmaciesReportComponent', () => {
  let component: PharmaciesReportComponent;
  let fixture: ComponentFixture<PharmaciesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmaciesReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmaciesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
