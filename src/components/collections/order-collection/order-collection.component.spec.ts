import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCollectionComponent } from './order-collection.component';

describe('OrderCollectionComponent', () => {
  let component: OrderCollectionComponent;
  let fixture: ComponentFixture<OrderCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
