import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsDashboardComponent } from './clinics-dashboard.component';

describe('ClinicsDashboardComponent', () => {
  let component: ClinicsDashboardComponent;
  let fixture: ComponentFixture<ClinicsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
