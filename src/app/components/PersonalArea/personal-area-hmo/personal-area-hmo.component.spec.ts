import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAreaHMOComponent } from './personal-area-hmo.component';

describe('PersonalAreaHMOComponent', () => {
  let component: PersonalAreaHMOComponent;
  let fixture: ComponentFixture<PersonalAreaHMOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalAreaHMOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalAreaHMOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
