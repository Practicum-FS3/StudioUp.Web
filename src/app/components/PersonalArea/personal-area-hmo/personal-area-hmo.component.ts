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
    this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
      (response) => {
        this.customerHMOSArr = response;
        this.customerHMOS = this.customerHMOSArr.find(c => c.customerID === this.customerID) || null;
        this.enterFormDetails();
      },
      (error) => {
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
        this.loadFile();
      }
    } else {
      // this.personalForm.reset();
      this.uploadedFileName = null;
    }
  }


  onSubmitPersonalForm() {
    if (this.personalForm.invalid) {
      return;
    }
    this.HMOCodeValue = this.personalForm.get('HMOCode')?.value;
    this.freefitCodeValue = this.personalForm.get('freefitCode')?.value;

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
    this.fileExists = false;
    this.customerHMOS = new CustomerHMOS(0, 6, this.HMOCode, this.freefitCode, this.fileId);
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
      this.onUploadFile();
    } else {
      this.uploadedFileName = null;
    }

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
        if (this.customerHMOS) {
          this.updateFileCustomerHMOS(response.id);
        } else {
          this.fileId = response.id;
        }

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
        const fileName = response.type;
        console.log(response.stream());

        const contentType = response.type; // או הגדר תוכן ברירת מחדל
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(response));
        console.log('Loaded file successfully, URL:', this.fileUrl);
        this.uploadedFileName = fileName;
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

    const confirmation = confirm('האם אתה בטוח שברצונך למחוק את הקובץ?');

    if (confirmation) {
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
    } else {
      console.log('File deletion canceled by user');
    }
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

