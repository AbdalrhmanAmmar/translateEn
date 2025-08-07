import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostOrdersComponent } from './lost-orders.component';

describe('LostOrdersComponent', () => {
  let component: LostOrdersComponent;
  let fixture: ComponentFixture<LostOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
