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
  customerNotFound: boolean = false;
  formSubmitAttempt: boolean = false;

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
    this.formSubmitAttempt = true;
    this.customerNotFound = false;

    if (this.personalForm.invalid) {
      return;
    }

    const { customerCode, freefitCode } = this.personalForm.value;

    if (!customerCode) {
      return;
    }

    this.personalAreaHMOService.getAllCustomerHMOS().subscribe(
      (response) => {
        this.customerHMOSArr = response;
        console.log(this.customerHMOSArr);

        this.customerHMOS = this.customerHMOSArr.find(c => c.customerID == customerCode) || null;

        if (!this.customerHMOS) {
          this.customerNotFound = true;
        }

        this.fileExists = !!this.customerHMOS?.filedId;
      },
      (error) => {
        console.error('Error fetching customer HMOS', error);
      }
    );
  }

  onCustomerCodeInput() {
    this.customerNotFound = false;
  }


  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileForm.patchValue({
        registrationForm: file
      });
    }
  }
  onUploadFile() {
    if (!this.fileForm.get('registrationForm')?.value) {
      this.fileForm.get('registrationForm')?.setErrors({ required: true });
      return;
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