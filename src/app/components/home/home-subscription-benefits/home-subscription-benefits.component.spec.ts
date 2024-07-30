import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSubscriptionBenefitsComponent } from './home-subscription-benefits.component';

describe('HomeSubscriptionBenefitsComponent', () => {
  let component: HomeSubscriptionBenefitsComponent;
  let fixture: ComponentFixture<HomeSubscriptionBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeSubscriptionBenefitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSubscriptionBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
