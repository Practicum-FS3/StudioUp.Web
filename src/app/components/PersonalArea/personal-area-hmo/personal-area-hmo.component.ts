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

  isFormDirty: boolean = false;
  fileChanged: boolean = false;
  uploadedFileName: string | null = null;
  customerID: number = 6;
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
  ) {
    this.personalForm = this.fb.group({
      HMOCode: ['', [Validators.required,]],
      freefitCode: ['', Validators.required],
      registrationForm: [null],
    });
    this.personalForm.valueChanges.subscribe(() => {
      this.isFormDirty = this.personalForm.dirty;
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
      if (this.fileExists) {
        this.loadFile(this.customerHMOS.filedId);
      }
    } else {
      this.uploadedFileName = null;
    }
  }

  async onSubmitPersonalForm() {
    if (this.personalForm.invalid) {
      return;
    }
    if (!this.isFormDirty && !this.fileChanged) {
      return;
    }

    this.HMOCodeValue = this.personalForm.get('HMOCode')?.value;
    this.freefitCodeValue = this.personalForm.get('freefitCode')?.value;

    if (this.fileChanged) {
      await this.onUploadFile();
    }

    this.loadFile(this.fileId);

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

    this.customerHMOS = {
      id: 0,
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
    console.log(this.fileId, this.fileExists);
    this.customerHMOS!.hmoid = this.HMOCodeValue;
    this.customerHMOS!.freeFitId = this.freefitCodeValue;
    if (this.fileId) {
      this.customerHMOS!.filedId = this.fileId;
    }
    this.personalAreaHMOService.updateCustomerHMOS(this.customerHMOS!.id, this.customerHMOS).subscribe(
      (response) => {
        console.log('Customer HMOS updated successfully', response);
      },
      (error) => {
        console.error('Error updating customer HMOS', error);
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.fileChanged = true;
      const file = event.target.files[0];
      this.personalForm.patchValue({
        registrationForm: file
      });
      this.uploadedFileName = file.name;
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
      this.fileExists = true;
      this.loadFile(this.fileId);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  }

  loadFile(file: number | undefined) {
    if (!file) return;

    this.fileService.getFile(file!).subscribe(
      (response: Blob) => {
        console.log(response.stream());

        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(response));
        console.log('Loaded file successfully, URL:', this.fileUrl);

        this.isImage = this.isImageFile(response);
        this.isPDF = this.isPdfFile(response);
        this.fileExists = true;
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
          console.log('Updated filedId after deletion:', this.customerHMOS?.filedId);
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

