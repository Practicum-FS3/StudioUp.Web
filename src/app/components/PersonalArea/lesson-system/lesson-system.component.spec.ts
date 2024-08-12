import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSystemComponent } from './lesson-system.component';

describe('LessonSystemComponent', () => {
  let component: LessonSystemComponent;
  let fixture: ComponentFixture<LessonSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
