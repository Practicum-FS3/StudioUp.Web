import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../../services/fileService/file.service';
import { PersonalAreaHMOService } from '../../../services/personal-area-HMO.service/personal-area-hmo.service';
import { CustomerHMOS } from '../../../models/CustomerHMOS';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-personal-area-hmo',
  templateUrl: './personal-area-hmo.component.html',
  styleUrls: ['./personal-area-hmo.component.scss']
})
export class PersonalAreaHMOComponent {

  customerID: number = 4;
  exsistCustomer: boolean = false;
  personalForm: FormGroup;
  customerHMOS: CustomerHMOS | null = null;
  customerHMOSArr: CustomerHMOS[] = [];
  fileExists: boolean = false;
  fileUrl: SafeUrl | string = "";
  isImage: boolean = false;
  isPDF: boolean = false;
  isValidCustomer: boolean = false;
  HMOCode: number | null = null;
  freefitCode: string | undefined;
  hmoOptions = [
    { code: 1, name: 'קופת חולים כללית' },
    { code: 5, name: 'קופת חולים מאוחדת' },
    { code: 4, name: 'קופת חולים מכבי' }
  ];

  constructor(
    private fb: FormBuilder,
    private personalAreaHMOService: PersonalAreaHMOService,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {
    this.personalForm = this.fb.group({
      HMOCode: ['', [Validators.required,]],
      freefitCode: ['', Validators.required],
      registrationForm: [null, Validators.required],
    });
  }
  ngOnInit() {
    this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
      (response) => {
        this.customerHMOSArr = response;
        this.customerHMOS = this.customerHMOSArr.find(c => c.customerID === this.customerID) || null;

        // אם יש לקוח קיים, תעדכן את ה-form
        if (this.customerHMOS) {
          this.populateForm();
          this.loadFile(); // טען את הקובץ אם הלקוח קיים
        } else {
          this.personalForm.reset(); // אם לא קיים לקוח, רוקן את הטופס
        }
      },
      (error) => {
        console.error('Error fetching customer HMOS', error);
      }
    );
  }

  // ngOnInit() {
  //   this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
  //     (response) => {
  //       this.customerHMOSArr = response;
  //       this.customerHMOS = this.customerHMOSArr.find(c => c.customerID === this.customerID) || null;

  //       // אם יש לקוח קיים, תעדכן את ה-form
  //       if (this.customerHMOS) {

  //         this.personalForm.patchValue({
  //           HMOCode: this.customerHMOS.hmoId, // הקצה את ה-hmoId אם קיים
  //           freefitCode: this.customerHMOS.freeFitId,
  //           registrationForm: null // או כל ערך אחר שתרצה
  //         });
  //       } else {
  //         // אם לא קיים לקוח, השאר את HMOCode ריק
  //         this.personalForm.patchValue({
  //           HMOCode: '', // או תן ערך ברירת מחדל אחר אם תרצה
  //           freefitCode: '',
  //           registrationForm: null
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching customer HMOS', error);
  //     }
  //   );
  // }

  // ngOnInit() {
  //   this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
  //     (response) => {
  //       this.customerHMOSArr = response;
  //       this.customerHMOS = this.customerHMOSArr.find(c => c.customerID === this.customerID) || null;
  //       this.populateForm();
  //     },
  //     (error) => {
  //       console.error('Error fetching customer HMOS', error);
  //     }
  //   );
  // }
  populateForm() {
    if (this.customerHMOS) {
      this.hmoOptions.forEach(op => {
        if (op.code == this.customerHMOS!.hmoid) {
          console.log(op);
        }
      })
      this.personalForm.patchValue({
        HMOCode: this.customerHMOS.hmoid,
        freefitCode: this.customerHMOS.freeFitId,
        registrationForm: null // הקובץ יתעדכן בנפרד
      });
      this.fileExists = !!this.customerHMOS.filedId; // בדוק אם יש קובץ

      // אם יש קובץ, טען אותו
      if (this.fileExists) {
        this.loadFile();
      }
    } else {
      // אם הלקוח לא קיים, נוודא שהשדות ריקים
      this.personalForm.reset();
    }
  }

  // populateForm() {
  //   if (this.customerHMOS) {
  //     this.personalForm.patchValue({
  //       HMOCode: this.customerHMOS.hmoId,
  //       freefitCode: this.customerHMOS.freeFitId,
  //       registrationForm: null // הקובץ יתעדכן בנפרד
  //     });
  //     this.fileExists = !!this.customerHMOS.filedId;

  //     if (this.fileExists) {
  //       this.loadFile();
  //     }
  //   } else {
  //     // אם הלקוח לא קיים, נוודא שהשדות ריקים
  //     this.personalForm.reset();
  //   }
  // }

  onSubmitPersonalForm() {
    if (this.personalForm.invalid) {
      return;
    }

    const HMOCodeValue = this.personalForm.get('HMOCode')?.value;
    const freefitCodeValue = this.personalForm.get('freefitCode')?.value;

    if (this.customerHMOS) {
      // עדכון לקוח קיים
      this.customerHMOS.hmoid = HMOCodeValue;
      this.customerHMOS.freeFitId = freefitCodeValue;
      this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS.id, this.customerHMOS).subscribe(
        (response) => {
          console.log('Customer HMOS updated successfully', response);
        },
        (error) => {
          console.error('Error updating customer HMOS', error);
        }
      );
    } else {
      // הוספת לקוח חדש
      const newCustomerHMOS = new CustomerHMOS();
      newCustomerHMOS.hmoid = HMOCodeValue;
      newCustomerHMOS.freeFitId = freefitCodeValue;
      this.personalAreaHMOService.addCustomerHMOS(newCustomerHMOS).subscribe(
        (response) => {
          console.log('Customer HMOS added successfully', response);
        },
        (error) => {
          console.error('Error adding customer HMOS', error);
        }
      );
    }
  }

  // ngOnInit() {
  //   this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
  //     (response) => {
  //       this.customerHMOSArr = response;
  //       this.customerHMOS = this.customerHMOSArr.find(c => c.customerID == this.customerID) || null;
  //       if (this.customerHMOS) {
  //         this.customerData = this.customerHMOS;
  //         this.personalForm.patchValue({
  //           HMOCode: this.customerHMOS.hmoId,
  //           freefitCode: this.customerHMOS.freeFitId,
  //           registrationForm: 
  //         });
  //       }
  //     }, (error) => {

  //     });
  // }

  // onSubmitPersonalForm() {

  //   if (this.personalForm.invalid) {
  //     // console.log("this.personalForm.invalid");     
  //     return;
  //   }
  //   // const { HMOCodeValue, freefitCodeValue } = this.personalForm.value;
  //   const HMOCodeValue = this.personalForm.get('HMOCode')?.value;
  //   const freefitCodeValue = this.personalForm.get('freefitCode')?.value;

  //   console.log(HMOCodeValue); // בדיקת הערך שנבחר
  //   console.log(freefitCodeValue); // בדיקת הערך של freefitCode

  //   this.HMOCode = HMOCodeValue;

  //   this.freefitCode = freefitCodeValue;

  //   if (!this.HMOCode) {
  //     return;
  //   }

  //   this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
  //     (response) => {
  //       this.customerHMOSArr = response;
  //       this.customerHMOS = this.customerHMOSArr.find(c => c.customerID == 4) || null;
  //       if (this.customerHMOS == null) {
  //         this.customerHMOS = new CustomerHMOS();
  //         // this.addCustomerHMOS();

  //       }
  //       this.isValidCustomer = this.validCustomer(this.customerHMOS);
  //       console.log(this.isValidCustomer);

  //       this.fileExists = !!this.customerHMOS?.filedId;

  //       if (this.fileExists) {
  //         this.loadFile();
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching customer HMOS', error);
  //     }
  //   );
  // }
  validCustomer(customer: CustomerHMOS | null): boolean {
    if (!(customer?.freeFitId == this.freefitCode) || !(customer?.hmoid !== this.HMOCode))
      return false;
    return true;
  }

  addCustomerHMOS(fileId: number) {
    this.fileExists = false;
    // this.customerHMOS = {
    //   ...this.customerHMOS,
    //   filedId: fileId,
    //   freeFitId: this.freefitCode,
    //   customerID: 6
    // };
    // this.customerHMOS!.filedId = fileId;
    // this.customerHMOS!.freeFitId = this.freefitCode;
    // this.customerHMOS!.customerID = 6;
    this.personalAreaHMOService.addCustomerHMOS(this.customerHMOS).subscribe(
      (response) => {
        console.log("succses!!!!!!!");


      }, (error) => {
        console.error('Error adding customerHMO', error);
      })
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.personalForm.patchValue({
        registrationForm: file
      });
    }
    this.onUploadFile();
  }

  onUploadFile() {
    if (!this.personalForm.get('registrationForm')?.value) {
      this.personalForm.get('registrationForm')?.setErrors({ required: true });
      return;
    }

    const formData = new FormData();
    formData.append('file', this.personalForm.get('registrationForm')?.value);

    this.fileService.uploadFile(formData).subscribe(
      (response) => {
        console.log('File uploaded successfully', response.id);

        this.updateCustomerHMOSWithFile(response.id);
        this.loadFile();
      },
      (error) => {
        console.error('Error uploading file', error);
      }
    );
  }

  loadFile() {
    if (!this.customerHMOS?.filedId) return;

    this.fileService.getFile(this.customerHMOS.filedId).subscribe(
      (response: Blob) => {
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(response));
        console.log('Loaded file successfully, URL:', this.fileUrl);

        this.isImage = this.isImageFile(response);
        this.isPDF = this.isPdfFile(response);
      },
      (error) => {
        console.error('Error loading file', error);
      }
    );
  }

  onDeleteFile() {
    if (!this.customerHMOS?.filedId) return;

    this.fileService.deleteFile(this.customerHMOS.filedId).subscribe(
      () => {
        console.log('File deleted successfully');
        this.fileExists = false;
        this.customerHMOS!.filedId = 0;
        this.fileUrl = "";
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
  updateCustomerHMOSWithFile(filedId: number) {
    if (!this.customerHMOS?.id) {
      this.addCustomerHMOS(filedId);
      return;
    }
    this.customerHMOS.filedId = filedId;
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

  triggerFileInput() {
    const fileInput = document.getElementById('registrationForm') as HTMLElement;
    fileInput.click();
  }

  isImageFile(blob: Blob | null): boolean {
    if (!blob) return false;

    const imageTypes = ['image/jpeg', 'image/png'];
    const mimeType = this.getFileMimeType(blob);
    console.log('Image MIME Type:', mimeType);

    return imageTypes.includes(mimeType);
  }

  isPdfFile(blob: Blob | null): boolean {
    if (!blob) return false;

    const mimeType = blob.type;

    return mimeType === 'application/pdf';
  }

  getFileMimeType(blob: Blob | null): string {
    if (!blob) return '';
    return blob.type;
  }


  openFileInNewTab() {
    if (!this.fileUrl) return;
    const url = (this.fileUrl as any).changingThisBreaksApplicationSecurity as string;
    window.open(url, '_blank');

  }
}

















// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { FileService } from '../../../services/fileService/file.service';
// import { PersonalAreaHMOService } from '../../../services/personal-area-HMO.service/personal-area-hmo.service';
// import { CustomerHMOS } from '../../../models/CustomerHMOS';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-personal-area-hmo',
//   templateUrl: './personal-area-hmo.component.html',
//   styleUrls: ['./personal-area-hmo.component.scss']
// })
// export class PersonalAreaHMOComponent {

//   customerID: number = 4;
//   exsistCustomer: boolean = false;
//   addCustomer: CustomerHMOS | null = null;
//   personalForm: FormGroup;
//   fileForm: FormGroup;
//   customerHMOS: CustomerHMOS | null = null;
//   customerHMOSArr: CustomerHMOS[] = [];
//   fileExists: boolean = false;
//   fileUrl: SafeUrl | string = "";
//   isImage: boolean = false;
//   isPDF: boolean = false;
//   isValidCustomer: boolean = false;
//   HMOCode: number | null = null;
//   freefitCode: string | undefined;
//   hmoOptions = [
//     { code: '1', name: 'קופת חולים כללית' },
//     { code: '5', name: 'קופת חולים מאוחדת' },
//     { code: '4', name: 'קופת חולים מכבי' }
//   ];

//   constructor(
//     private fb: FormBuilder,
//     private personalAreaHMOService: PersonalAreaHMOService,
//     private fileService: FileService,
//     private sanitizer: DomSanitizer
//   ) {
//     this.personalForm = this.fb.group({
//       HMOCode: ['', [Validators.required,]],
//       freefitCode: ['', Validators.required],
//     });

//     this.fileForm = this.fb.group({
//       registrationForm: [null, Validators.required]
//     });
//   }

//   ngOnInit() {
//     this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
//       (response) => {
//         this.customerHMOSArr = response;
//         this.customerHMOS = this.customerHMOSArr.find(c => c.customerID == this.customerID) || null;
//       }, (error) => {

//       });
//   }

//   onSubmitPersonalForm() {

//     if (this.personalForm.invalid) {
//       // console.log("this.personalForm.invalid");
//       return;
//     }
//     // const { HMOCodeValue, freefitCodeValue } = this.personalForm.value;
//     const HMOCodeValue = this.personalForm.get('HMOCode')?.value;
//     const freefitCodeValue = this.personalForm.get('freefitCode')?.value;

//     console.log(HMOCodeValue); // בדיקת הערך שנבחר
//     console.log(freefitCodeValue); // בדיקת הערך של freefitCode

//     this.HMOCode = HMOCodeValue;

//     this.freefitCode = freefitCodeValue;

//     if (!this.HMOCode) {
//       return;
//     }

//     this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
//       (response) => {
//         this.customerHMOSArr = response;
//         this.customerHMOS = this.customerHMOSArr.find(c => c.customerID == 4) || null;
//         if (this.customerHMOS == null) {
//           this.customerHMOS = new CustomerHMOS();
//           // this.addCustomerHMOS();

//         }
//         this.isValidCustomer = this.validCustomer(this.customerHMOS);
//         console.log(this.isValidCustomer);

//         this.fileExists = !!this.customerHMOS?.filedId;

//         if (this.fileExists) {
//           this.loadFile();
//         }
//       },
//       (error) => {
//         console.error('Error fetching customer HMOS', error);
//       }
//     );
//   }
//   validCustomer(customer: CustomerHMOS | null): boolean {
//     if (!(customer?.freeFitId == this.freefitCode) || !(customer?.hmoId !== this.HMOCode))
//       return false;
//     return true;
//   }

//   addCustomerHMOS(fileId: number) {
//     this.fileExists = false;
//     // this.customerHMOS = {
//     //   ...this.customerHMOS,
//     //   filedId: fileId,
//     //   freeFitId: this.freefitCode,
//     //   customerID: 6
//     // };
//     // this.customerHMOS!.filedId = fileId;
//     // this.customerHMOS!.freeFitId = this.freefitCode;
//     // this.customerHMOS!.customerID = 6;
//     this.personalAreaHMOService.addCustomerHMOS(this.customerHMOS).subscribe(
//       (response) => {
//         console.log("succses!!!!!!!");


//       }, (error) => {
//         console.error('Error adding customerHMO', error);
//       })
//   }

//   onFileChange(event: any) {
//     if (event.target.files.length > 0) {
//       const file = event.target.files[0];
//       this.fileForm.patchValue({
//         registrationForm: file
//       });
//     }
//     this.onUploadFile();
//   }

//   onUploadFile() {
//     if (!this.fileForm.get('registrationForm')?.value) {
//       this.fileForm.get('registrationForm')?.setErrors({ required: true });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', this.fileForm.get('registrationForm')?.value);

//     this.fileService.uploadFile(formData).subscribe(
//       (response) => {
//         console.log('File uploaded successfully', response.id);

//         this.updateCustomerHMOSWithFile(response.id);
//         this.loadFile();
//       },
//       (error) => {
//         console.error('Error uploading file', error);
//       }
//     );
//   }

//   loadFile() {
//     if (!this.customerHMOS?.filedId) return;

//     this.fileService.getFile(this.customerHMOS.filedId).subscribe(
//       (response: Blob) => {
//         this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(response));
//         console.log('Loaded file successfully, URL:', this.fileUrl);

//         this.isImage = this.isImageFile(response);
//         this.isPDF = this.isPdfFile(response);
//       },
//       (error) => {
//         console.error('Error loading file', error);
//       }
//     );
//   }

//   onDeleteFile() {
//     if (!this.customerHMOS?.filedId) return;

//     this.fileService.deleteFile(this.customerHMOS.filedId).subscribe(
//       () => {
//         console.log('File deleted successfully');
//         this.fileExists = false;
//         this.customerHMOS!.filedId = 0;
//         this.fileUrl = "";
//         this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS?.id, this.customerHMOS).subscribe(
//           (response) => {
//             console.log('Customer HMOS updated successfully', response);
//           },
//           (error) => {
//             console.error('Error updating customer HMOS', error);
//           }
//         );
//       },
//       (error) => {
//         console.error('Error deleting file', error);
//       }
//     );
//   }
//   updateCustomerHMOSWithFile(filedId: number) {
//     if (!this.customerHMOS?.id) {
//       this.addCustomerHMOS(filedId);
//       return;
//     }
//     this.customerHMOS.filedId = filedId;
//     this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS.id, this.customerHMOS).subscribe(
//       (response) => {
//         console.log('Customer HMOS updated successfully', response);
//         this.fileExists = true;
//       },
//       (error) => {
//         console.error('Error updating customer HMOS', error);
//       }
//     );
//   }

//   onDownloadFile() {
//     if (!this.customerHMOS?.filedId) return;

//     this.fileService.getFile(this.customerHMOS.filedId).subscribe(
//       (response) => {
//         const blob = new Blob([response], { type: response.type });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'registrationForm';
//         a.click();
//         window.URL.revokeObjectURL(url);
//       },
//       (error) => {
//         console.error('Error downloading file', error);
//       }
//     );

//   }

//   triggerFileInput() {
//     const fileInput = document.getElementById('registrationForm') as HTMLElement;
//     fileInput.click();
//   }

//   isImageFile(blob: Blob | null): boolean {
//     if (!blob) return false;

//     const imageTypes = ['image/jpeg', 'image/png'];
//     const mimeType = this.getFileMimeType(blob);
//     console.log('Image MIME Type:', mimeType);

//     return imageTypes.includes(mimeType);
//   }

//   isPdfFile(blob: Blob | null): boolean {
//     if (!blob) return false;

//     const mimeType = blob.type;

//     return mimeType === 'application/pdf';
//   }

//   getFileMimeType(blob: Blob | null): string {
//     if (!blob) return '';
//     return blob.type;
//   }


//   openFileInNewTab() {
//     if (!this.fileUrl) return;
//     const url = (this.fileUrl as any).changingThisBreaksApplicationSecurity as string;
//     window.open(url, '_blank');

//   }
// }

