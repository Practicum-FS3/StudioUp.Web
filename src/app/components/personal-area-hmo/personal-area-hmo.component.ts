import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../services/fileService/file.service';
import { PersonalAreaHMOServiceService } from '../../services/personal-area-HMO.service/personal-area-hmo.service.service';
import { CustomerHMOS } from '../../models/CustomerHMOS';

@Component({
  selector: 'app-personal-area-hmo',
  templateUrl: './personal-area-hmo.component.html',
  styleUrl: './personal-area-hmo.component.scss'
})
export class PersonalAreaHMOComponent {

  personalForm: FormGroup;
  fileForm: FormGroup;
  customerHMOS: CustomerHMOS | null = null;
  customerHMOSArr: CustomerHMOS[] = [];
  fileExists: boolean = false;
  customerNotFound: boolean = false; // משתנה למעקב אחר קוד לקוח לא קיים
  formSubmitAttempt: boolean = false; // משתנה לעקוב אחר ניסיונות לשלוח את הטופס

  constructor(
    private fb: FormBuilder,
    private personalAreaHMOService: PersonalAreaHMOServiceService,
    private fileService: FileService
  ) {
    this.personalForm = this.fb.group({
      customerCode: ['', Validators.required],
      freefitCode: ['', Validators.required],
    });

    this.fileForm = this.fb.group({
      registrationForm: [null, Validators.required]
    });
  }

  ngOnInit() { }

  onSubmitPersonalForm() {
    this.formSubmitAttempt = true; // סמן שניסיון לשלוח את הטופס נעשה
    this.customerNotFound = false; // אתחל את משתנה ה-customerNotFound

    if (this.personalForm.invalid) {
      return; // אם הטופס לא תקין, אל נוודא שהשגיאה "קוד לקוח לא קיים" לא תוצג
    }

    const { customerCode, freefitCode } = this.personalForm.value;

    // אם הקוד לקוח ריק, לא נמשיך לחפש אותו
    if (!customerCode) {
      return; // אל נבצע חיפוש
    }

    this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
      (response) => {
        this.customerHMOSArr = response;
        console.log(this.customerHMOSArr);

        this.customerHMOS = this.customerHMOSArr.find(c => c.customerID == customerCode) || null;

        // בדוק אם קוד הלקוח לא נמצא
        if (!this.customerHMOS) {
          this.customerNotFound = true; // קוד לקוח לא קיים
        }

        this.fileExists = !!this.customerHMOS?.filedId; // לבדוק אם קיים קובץ
      },
      (error) => {
        console.error('Error fetching customer HMOS', error);
      }
    );
  }

  // פונקציה להחזרת השגיאה של קוד הלקוח לא קיים כאשר המשתמש מתחיל לכתוב מחדש
  onCustomerCodeInput() {
    this.customerNotFound = false; // החזר את המשתנה ל-false כאשר מתחילים לכתוב מחדש
  }


  // onSubmitPersonalForm() {
  //   this.formSubmitAttempt = true; // סמן שניסיון לשלוח את הטופס נעשה
  //   if (this.personalForm.invalid) {
  //     return;
  //   }

  //   const { customerCode, freefitCode } = this.personalForm.value;

  //   this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
  //     (response) => {
  //       this.customerHMOSArr = response;
  //       console.log(this.customerHMOSArr);

  //       this.customerHMOS = this.customerHMOSArr.find(c => c.customerID == customerCode) || null;

  //       if (!this.customerHMOS) {
  //         this.customerNotFound = true;
  //       } else {
  //         this.customerNotFound = false;
  //       }

  //       this.fileExists = !!this.customerHMOS?.filedId; // לבדוק אם קיים קובץ
  //     },
  //     (error) => {
  //       console.error('Error fetching customer HMOS', error);
  //     }
  //   );
  // }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileForm.patchValue({
        registrationForm: file
      });
    }
  }
  onUploadFile() {
    // בדוק אם יש קובץ נבחר
    if (!this.fileForm.get('registrationForm')?.value) {
      // הגדר שגיאה על שדה הקובץ
      this.fileForm.get('registrationForm')?.setErrors({ required: true });
      return; // אל תמשיך אם לא נבחר קובץ
    }

    const formData = new FormData();
    formData.append('file', this.fileForm.get('registrationForm')?.value);

    this.fileService.uploadFile(formData).subscribe(
      (response) => {
        console.log('File uploaded successfully', response.id);
        this.updateCustomerHMOSWithFile(response.id);
      },
      (error) => {
        console.error('Error uploading file', error);
      }
    );
  }


  // onUploadFile() {
  //   if (this.fileForm.invalid) {
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', this.fileForm.get('registrationForm')?.value);

  //   this.fileService.uploadFile(formData).subscribe(
  //     (response) => {
  //       console.log('File uploaded successfully', response.id);
  //       this.updateCustomerHMOSWithFile(response.id);
  //     },
  //     (error) => {
  //       console.error('Error uploading file', error);
  //     }
  //   );
  // }

  updateCustomerHMOSWithFile(filedId: number) {
    if (!this.customerHMOS)
      return;
    this.customerHMOS.filedId = filedId;
    console.log(this.customerHMOS);

    this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS.id, this.customerHMOS).subscribe(
      (response) => {
        console.log('Customer HMOS updated successfully', response);
        this.fileExists = true;
      },
      (error) => {
        console.error('Error updating customer HMOS', error);
      }
    );
  }

  onDeleteFile() {
    if (!this.customerHMOS?.filedId)
      return;

    this.fileService.deleteFile(this.customerHMOS.filedId).subscribe(
      () => {
        console.log('File deleted successfully');
        this.fileExists = false;
        this.customerHMOS!.filedId = 0; // איפוס ה-ID של הקובץ
        this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS?.id, this.customerHMOS).subscribe(
          (response) => {
            console.log('Customer HMOS updated successfully', response);
          },
          (error) => {
            console.error('Error updating customer HMOS', error);
          }
        );
      },
      (error) => {
        console.error('Error deleting file', error);
      }
    );
  }

  onDownloadFile() {
    if (!this.customerHMOS?.filedId) return;

    this.fileService.getFile(this.customerHMOS.filedId).subscribe(
      (response) => {
        const blob = new Blob([response], { type: response.type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'registrationForm';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading file', error);
      }
    );
  }
}
// personalForm: FormGroup;
// fileForm: FormGroup;
// customerHMOS: CustomerHMOS | null = null;
// customerHMOSArr: CustomerHMOS[] = [];
// fileExists: boolean = false;
// formSubmitAttempt: boolean = false;  // Added to track form submit attempts

// constructor(
//   private fb: FormBuilder,
//   private personalAreaHMOService: PersonalAreaHMOServiceService,
//   private fileService: FileService
// ) {
//   this.personalForm = this.fb.group({
//     customerCode: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
//     freefitCode: ['', Validators.required],
//   });

//   this.fileForm = this.fb.group({
//     registrationForm: [null, Validators.required]
//   });
// }

// ngOnInit() { }

// onSubmitPersonalForm() {
//   this.formSubmitAttempt = true;
//   if (this.personalForm.invalid) {
//     this.markFormGroupTouched(this.personalForm);
//     return;
//   }

//   const { customerCode, freefitCode } = this.personalForm.value;

//   this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
//     (response) => {
//       this.customerHMOSArr = response;
//       console.log(this.customerHMOSArr);

//       this.customerHMOSArr.forEach(c => {
//         if (c.customerID == customerCode)
//           this.customerHMOS = c;
//       });

//       this.fileExists = !!this.customerHMOS?.filedId; // Check if file exists
//     },
//     (error) => {
//       console.error('Error fetching customer HMOS', error);
//     }
//   );
// }

// onFileChange(event: any) {
//   if (event.target.files.length > 0) {
//     const file = event.target.files[0];
//     this.fileForm.patchValue({
//       registrationForm: file
//     });
//   }
// }

// onUploadFile() {
//   this.formSubmitAttempt = true;
//   if (this.fileForm.invalid) {
//     this.markFormGroupTouched(this.fileForm);
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', this.fileForm.get('registrationForm')?.value);

//   this.fileService.uploadFile(formData).subscribe(
//     (response) => {
//       console.log('File uploaded successfully', response.id);
//       this.updateCustomerHMOSWithFile(response.id);
//     },
//     (error) => {
//       console.error('Error uploading file', error);
//     }
//   );
// }

// updateCustomerHMOSWithFile(filedId: number) {
//   if (!this.customerHMOS)
//     return;
//   this.customerHMOS.filedId = filedId;
//   console.log(this.customerHMOS);

//   this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS.id, this.customerHMOS).subscribe(
//     (response) => {
//       console.log('Customer HMOS updated successfully', response);
//       this.fileExists = true;
//     },
//     (error) => {
//       console.error('Error updating customer HMOS', error);
//     }
//   );
// }

// onDeleteFile() {
//   if (!this.customerHMOS?.filedId)
//     return;

//   this.fileService.deleteFile(this.customerHMOS.filedId).subscribe(
//     () => {
//       console.log('File deleted successfully');
//       this.fileExists = false;
//       this.customerHMOS!.filedId = 0; // Reset the file ID
//       this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS?.id, this.customerHMOS).subscribe(
//         (response) => {
//           console.log('Customer HMOS updated successfully', response);
//         },
//         (error) => {
//           console.error('Error updating customer HMOS', error);
//         }
//       );
//     },
//     (error) => {
//       console.error('Error deleting file', error);
//     }
//   );
// }

// onDownloadFile() {
//   if (!this.customerHMOS?.filedId) return;

//   this.fileService.getFile(this.customerHMOS.filedId).subscribe(
//     (response) => {
//       const blob = new Blob([response], { type: response.type });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'registrationForm';
//       a.click();
//       window.URL.revokeObjectURL(url);
//     },
//     (error) => {
//       console.error('Error downloading file', error);
//     }
//   );
// }

// private markFormGroupTouched(formGroup: FormGroup) {
//   Object.values(formGroup.controls).forEach(control => {
//     control.markAsTouched();
//     if ((control as any).controls) {
//       this.markFormGroupTouched(control as FormGroup);
//     }
//   });
// }


// personalForm: FormGroup;
// fileForm: FormGroup;
// customerHMOS: CustomerHMOS | null = null;
// customerHMOSArr: CustomerHMOS[] = [];
// fileExists: boolean = false;

// constructor(
//   private fb: FormBuilder,
//   private personalAreaHMOService: PersonalAreaHMOServiceService,
//   private fileService: FileService
// ) {
//   this.personalForm = this.fb.group({
//     customerCode: ['', Validators.required],
//     freefitCode: ['', Validators.required],
//   });

//   this.fileForm = this.fb.group({
//     registrationForm: [null, Validators.required]
//   });
// }

// ngOnInit() { }

// onSubmitPersonalForm() {
//   if (this.personalForm.invalid) {
//     this.personalForm.markAllAsTouched(); // Mark all controls as touched to show validation messages
//     return;
//   }

//   const { customerCode, freefitCode } = this.personalForm.value;

//   this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
//     (response) => {
//       this.customerHMOSArr = response;
//       console.log(this.customerHMOSArr);

//       this.customerHMOSArr.forEach(c => {
//         if (c.customerID == customerCode)
//           this.customerHMOS = c;
//       });

//       this.fileExists = !!this.customerHMOS?.filedId; // לבדוק אם קיים קובץ
//     },
//     (error) => {
//       console.error('Error fetching customer HMOS', error);
//     }
//   );
// }

// onFileChange(event: any) {
//   if (event.target.files.length > 0) {
//     const file = event.target.files[0];
//     this.fileForm.patchValue({
//       registrationForm: file
//     });
//   }
// }

// onUploadFile() {
//   if (this.fileForm.invalid) {
//     this.fileForm.markAllAsTouched(); // Mark all controls as touched to show validation messages
//     return;
//   }

//   const formData = new FormData();
//   formData.append('file', this.fileForm.get('registrationForm')?.value);

//   this.fileService.uploadFile(formData).subscribe(
//     (response) => {
//       console.log('File uploaded successfully', response.id);
//       this.updateCustomerHMOSWithFile(response.id);
//     },
//     (error) => {
//       console.error('Error uploading file', error);
//     }
//   );
// }

// updateCustomerHMOSWithFile(filedId: number) {
//   if (!this.customerHMOS)
//     return;
//   this.customerHMOS.filedId = filedId;
//   console.log(this.customerHMOS);

//   this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS.id, this.customerHMOS).subscribe(
//     (response) => {
//       console.log('Customer HMOS updated successfully', response);
//       this.fileExists = true;
//     },
//     (error) => {
//       console.error('Error updating customer HMOS', error);
//     }
//   );
// }

// onDeleteFile() {
//   if (!this.customerHMOS?.filedId)
//     return;

//   this.fileService.deleteFile(this.customerHMOS.filedId).subscribe(
//     () => {
//       console.log('File deleted successfully');
//       this.fileExists = false;
//       this.customerHMOS!.filedId = 0; // איפוס ה-ID של הקובץ
//       this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS?.id, this.customerHMOS).subscribe(
//         (response) => {
//           console.log('Customer HMOS updated successfully', response);
//         },
//         (error) => {
//           console.error('Error updating customer HMOS', error);
//         }
//       );
//     },
//     (error) => {
//       console.error('Error deleting file', error);
//     }
//   );
// }

// onDownloadFile() {
//   if (!this.customerHMOS?.filedId) return;

//   this.fileService.getFile(this.customerHMOS.filedId).subscribe(
//     (response) => {
//       const blob = new Blob([response], { type: response.type });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = 'registrationForm';
//       a.click();
//       window.URL.revokeObjectURL(url);
//     },
//     (error) => {
//       console.error('Error downloading file', error);
//     }
//   );
// }

