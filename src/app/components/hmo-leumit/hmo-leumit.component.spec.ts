import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HmoLeumitComponent } from './hmo-leumit.component';

describe('HmoLeumitComponent', () => {
  let component: HmoLeumitComponent;
  let fixture: ComponentFixture<HmoLeumitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HmoLeumitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HmoLeumitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
