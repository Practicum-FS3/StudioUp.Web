import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from '../../../services/fileService/file.service';
import { PersonalAreaHMOService } from '../../../services/personal-area-HMO.service/personal-area-hmo.service';
import { CustomerHMOS } from '../../../models/CustomerHMOS';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-personal-area-hmo',
  templateUrl: './personal-area-hmo.component.html',
  styleUrls: ['./personal-area-hmo.component.scss']
})
export class PersonalAreaHMOComponent {

  uploadedFileName: string | null = null;
  customerID: number = 6;
  exsistCustomer: boolean = false;
  personalForm: FormGroup;
  customerHMOS: CustomerHMOS | null = null;
  customerHMOSArr: CustomerHMOS[] = [];
  fileExists: boolean = false;
  fileUrl: SafeUrl | string = "";
  isImage: boolean = false;
  isPDF: boolean = false;
  isValidCustomer: boolean = false;
  fileId: number | undefined;
  HMOCode: number | undefined;
  freefitCode: string | undefined;
  HMOCodeValue: number | undefined;
  freefitCodeValue: string | undefined;
  hmoOptions = [
    { code: 1, name: 'קופת חולים כללית' },
    { code: 2, name: 'קופת חולים מאוחדת' },
    { code: 3, name: 'קופת חולים מכבי' }
  ];

  constructor(
    private fb: FormBuilder,
    private personalAreaHMOService: PersonalAreaHMOService,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    // private confirmationService: ConfirmationService // הוספת ConfirmationService
  ) {
    this.personalForm = this.fb.group({
      HMOCode: ['', [Validators.required,]],
      freefitCode: ['', Validators.required],
      registrationForm: [null],
    });
  }
  ngOnInit() {
    console.log("before");
    
    this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
      (response) => {
        console.log("in");
        this.customerHMOSArr = response;
        this.customerHMOS = this.customerHMOSArr.find(c => c.customerID === this.customerID) || null;
        this.enterFormDetails();
      },
      (error) => {
        console.log("in error");
        console.error('Error fetching customer HMOS', error);
      }
    );
  }

  enterFormDetails() {
    if (this.customerHMOS) {
      this.personalForm.patchValue({
        HMOCode: this.customerHMOS.hmoid,
        freefitCode: this.customerHMOS.freeFitId,
      });
      this.fileExists = !!this.customerHMOS.filedId;
      this.uploadedFileName = this.fileExists ? 'שם הקובץ שלך' : null;
      if (this.fileExists) {
        this.loadFile(this.customerHMOS.filedId);
      }
    } else {
      // this.personalForm.reset();
      this.uploadedFileName = null;
    }
  }


  async onSubmitPersonalForm() {
    if (this.personalForm.invalid) {
      return;
    }
    this.HMOCodeValue = this.personalForm.get('HMOCode')?.value;
    this.freefitCodeValue = this.personalForm.get('freefitCode')?.value;
    await this.onUploadFile();
    this.loadFile(this.fileId);
    console.log(this.customerHMOS);
    
    if (this.customerHMOS) {
      this.updateCustomerHMOS();
    } else {
      this.addCustomerHMOS();
    }
  }

  validCustomer(customer: CustomerHMOS | null): boolean {
    if (!(customer?.freeFitId == this.freefitCode) || !(customer?.hmoid !== this.HMOCode))
      return false;
    return true;
  }

  addCustomerHMOS() {
    // this.fileExists = false;
    // this.customerHMOS = new CustomerHMOS(0, 6, this.HMOCode, this.freefitCode, this.fileId,true);
    this.customerHMOS = {
      id: 0,  // האובייקט החדש עם ID 0
      customerID: this.customerID,
      hmoid: this.HMOCodeValue!,
      freeFitId: this.freefitCodeValue!,
      filedId: this.fileId || 0,
      isActive: true
  };
    console.log(this.customerHMOS);
    
    this.personalAreaHMOService.addCustomerHMOS(this.customerHMOS).subscribe(
      (response) => {
        console.log("succses!!!!!!!");


      }, (error) => {
        console.error('Error adding customerHMO', error);
      })
  }
  updateCustomerHMOS() {
    this.customerHMOS!.hmoid = this.HMOCodeValue;
    this.customerHMOS!.freeFitId = this.freefitCodeValue;
    this.customerHMOS!.filedId=this.fileId;
    this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS!.id, this.customerHMOS).subscribe(
      (response) => {
        console.log('Customer HMOS updated successfully', response);
      },
      (error) => {
        console.error('Error updating customer HMOS', error);
      }
    );
  }

  updateFileCustomerHMOS(filedId: number) {
    this.customerHMOS!.filedId = filedId;
    this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS!.id, this.customerHMOS).subscribe(
      (response) => {
        console.log('Customer HMOS updated successfully with file', response);
        this.fileExists = true;
      },
      (error) => {
        console.error('Error updating customer HMOS', error);
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.personalForm.patchValue({
        registrationForm: file
      });
      this.uploadedFileName = file.name;
      // this.onUploadFile();
    } else {
      this.uploadedFileName = null;
    }

  }
  async onUploadFile(): Promise<void> {
    if (!this.personalForm.get('registrationForm')?.value) {
      this.personalForm.get('registrationForm')?.setErrors({ required: true });
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.personalForm.get('registrationForm')?.value);
  
    try {
      const response = await this.fileService.uploadFile(formData).toPromise();
      console.log('File uploaded successfully', response.id);
      
      this.fileId = response.id;
      this.fileExists = true; // עדכון זה
      this.loadFile(this.fileId); // עדכון הקובץ שנבחר
  
      // עדכון פרטי הלקוח
      // if (this.customerHMOS) {
      //   this.customerHMOS.filedId = this.fileId;
      //   this.updateCustomerHMOS();
      // } else {
      //   this.addCustomerHMOS();
      // }
    } catch (error) {
      console.error('Error uploading file', error);
    }
  }
  
  // async onUploadFile(): Promise<void> {
  //   if (!this.personalForm.get('registrationForm')?.value) {
  //     this.personalForm.get('registrationForm')?.setErrors({ required: true });
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append('file', this.personalForm.get('registrationForm')?.value);
  
  //   try {
  //     const response = await this.fileService.uploadFile(formData).toPromise();
  //     console.log('File uploaded successfully', response.id);
      
  //     // עדכון ה-fileId עם ה-id של הקובץ שהועלה
  //     this.fileId = response.id;
  //     console.log(response.id);
  
  //     // טוען מחדש את הקובץ (אם צריך)
  //     this.loadFile(response.id);
  //   } catch (error) {
  //     console.error('Error uploading file', error);
  //   }
  // }
  
  // onUploadFile() {
  //   if (!this.personalForm.get('registrationForm')?.value) {
  //     this.personalForm.get('registrationForm')?.setErrors({ required: true });
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('file', this.personalForm.get('registrationForm')?.value);

  //   this.fileService.uploadFile(formData).subscribe(
  //     (response) => {
  //       console.log('File uploaded successfully', response.id);
  //       // if (this.customerHMOS) {
  //       //   this.updateFileCustomerHMOS(response.id);
  //       // } else {
  //         this.fileId = response.id;
  //       // }

  //       this.loadFile();
  //     },
  //     (error) => {
  //       console.error('Error uploading file', error);
  //     }
  //   );
  // }

  loadFile(file: number | undefined) {
    console.log(file);
    
    if (!file) return;
  
    this.fileService.getFile(file!).subscribe(
      (response: Blob) => {
        const fileName = response.type;
        console.log(response.stream());
  
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(response));
        console.log('Loaded file successfully, URL:', this.fileUrl);
        
        // עדכון הפרטים הנדרשים להצגת האייקונים והאפשרויות
        this.uploadedFileName = fileName;
        this.isImage = this.isImageFile(response);
        this.isPDF = this.isPdfFile(response);
        this.fileExists = true; // וודא שזה מתעדכן
      },
      (error) => {
        console.error('Error loading file', error);
      }
    );
  }
  

  // loadFile(file:number|undefined) {
  //   console.log(file);
    
  //   if (!file) return;

  //   this.fileService.getFile(file!).subscribe(
  //     (response: Blob) => {
  //       const fileName = response.type;
  //       console.log(response.stream());

  //       const contentType = response.type; // או הגדר תוכן ברירת מחדל
  //       this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(response));
  //       console.log('Loaded file successfully, URL:', this.fileUrl);
  //       this.uploadedFileName = fileName;
  //       this.isImage = this.isImageFile(response);
  //       this.isPDF = this.isPdfFile(response);
  //       console.log(this.isImage);
  //       console.log(this.isPDF);
        
        
  //     },
  //     (error) => {
  //       console.error('Error loading file', error);
  //     }
  //   );
  // }
  // loadFile() {
  //   if (!this.customerHMOS?.filedId) return;

  //   this.fileService.getFile(this.customerHMOS.filedId).subscribe(
  //     (response: Blob) => {
  //       const fileName = response.type;
  //       console.log(response.stream());

  //       const contentType = response.type; // או הגדר תוכן ברירת מחדל
  //       this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(response));
  //       console.log('Loaded file successfully, URL:', this.fileUrl);
  //       this.uploadedFileName = fileName;
  //       this.isImage = this.isImageFile(response);
  //       this.isPDF = this.isPdfFile(response);
  //     },
  //     (error) => {
  //       console.error('Error loading file', error);
  //     }
  //   );
  // }

  onDeleteFile() {
    if (!this.customerHMOS?.filedId) return;

    const confirmation = confirm('האם אתה בטוח שברצונך למחוק את הקובץ?');

    if (confirmation) {
        this.fileService.deleteFile(this.customerHMOS.filedId).subscribe(
            () => {
                console.log('File deleted successfully');
                this.fileExists = false;
                this.customerHMOS!.filedId = 0; // עדכון ה-filedId
                console.log('Updated filedId after deletion:', this.customerHMOS?.filedId); // הוספת log
                this.fileUrl = "";
                console.log(this.customerHMOS);
                
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
    } else {
        console.log('File deletion canceled by user');
    }
}


  // onDeleteFile() {
  //   if (!this.customerHMOS?.filedId) return;

  //   const confirmation = confirm('האם אתה בטוח שברצונך למחוק את הקובץ?');

  //   if (confirmation) {
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
  //   } else {
  //     console.log('File deletion canceled by user');
  //   }
  // }

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

