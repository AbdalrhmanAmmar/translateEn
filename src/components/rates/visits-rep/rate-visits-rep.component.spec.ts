import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateVisitsRepComponent } from './rate-visits-rep.component';

describe('RateVisitsRepComponent', () => {
  let component: RateVisitsRepComponent;
  let fixture: ComponentFixture<RateVisitsRepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateVisitsRepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateVisitsRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
