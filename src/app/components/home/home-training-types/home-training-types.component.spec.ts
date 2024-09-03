import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrainingTypesComponent } from './home-training-types.component';

describe('HomeTrainingTypesComponent', () => {
  let component: HomeTrainingTypesComponent;
  let fixture: ComponentFixture<HomeTrainingTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTrainingTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTrainingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
