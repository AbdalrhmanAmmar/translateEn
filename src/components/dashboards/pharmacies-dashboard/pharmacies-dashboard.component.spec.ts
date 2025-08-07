import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaciesDashboardComponent } from './pharmacies-dashboard.component';

describe('PharmaciesDashboardComponent', () => {
  let component: PharmaciesDashboardComponent;
  let fixture: ComponentFixture<PharmaciesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmaciesDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmaciesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
