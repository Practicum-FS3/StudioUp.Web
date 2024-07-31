import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-area-hmo',
  templateUrl: './personal-area-hmo.component.html',
  styleUrl: './personal-area-hmo.component.scss'
})
export class PersonalAreaHMOComponent {
  personalForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.personalForm = this.fb.group({
      customerCode: [''],
      prefitCode: [''],
      registrationForm: [null]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.personalForm.patchValue({
        registrationForm: file
      });
    }
  }

  onSubmit() {
    console.log(this.personalForm.value);
    // כאן תכניסי את הקוד כדי לשלוח את המידע לשרת שלך
  }
}
