import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSubHistoryComponent } from './customer-sub-history.component';

describe('CustomerSubHistoryComponent', () => {
  let component: CustomerSubHistoryComponent;
  let fixture: ComponentFixture<CustomerSubHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerSubHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSubHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
