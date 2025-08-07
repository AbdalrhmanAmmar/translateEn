import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsReportComponent } from './clinics-report.component';

describe('ClinicsReportComponent', () => {
  let component: ClinicsReportComponent;
  let fixture: ComponentFixture<ClinicsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicsReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
