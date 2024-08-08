import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditingFilesComponent } from './editing-files.component';

describe('EditingFilesComponent', () => {
  let component: EditingFilesComponent;
  let fixture: ComponentFixture<EditingFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditingFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditingFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
