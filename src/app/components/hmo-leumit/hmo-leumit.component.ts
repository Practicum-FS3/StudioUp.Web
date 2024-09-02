import { Component, Input, OnInit } from '@angular/core';
import { CustomersService } from '../../services/cudtomer.service/customers.service';
import { HmoLeumitService } from '../../services/hmoLeumit.service/hmo-leumit.service';
import { LeumitCommitments } from '../../models/leumit-commitments';
import { Customer } from '../../models/Customer';
import { FileService } from '../../services/fileService/file.service';
import { NgForm } from '@angular/forms';
import { LeumitCommimentTypesService } from '../../services/LeumitCommimentTypes.service/leumit-commiment-types.service';
import { LeumitCommimentTypes } from '../../models/leumit-commiment-types';
import { DownloadFileService } from '../../services/download-file.service/download-file.service';
import { LeadingComment } from '@angular/compiler';

@Component({
  selector: 'app-hmo-leumit',
  templateUrl: './hmo-leumit.component.html',
  styleUrl: './hmo-leumit.component.scss'
})
export class HmoLeumitComponent {
  @Input() custId?: number;
  currentCustomer?: Customer
  allLeumitType?: LeumitCommimentTypes[]
  selectedFile?: string
  currentLeumit?: LeadingComment
  allLeumitCommitments?: Array<LeumitCommitments>
  newCommiment: boolean = false
  clickSave: boolean = false
  newLeumitCommitments: LeumitCommitments = {
    id: '',
    commitmentTypeId: 0,
    customerId: 0,
    commitmentTz: '',
    birthDate: "",
    fileUploadId: null,
    validity: '',
    isActive: false
  };
  constructor(private customerService: CustomersService, private LeumitService: HmoLeumitService,
    private fileService: FileService,
    private leumitCommimentTypesService: LeumitCommimentTypesService,
    private downloadService: DownloadFileService
  ) { }

  ngOnInit(): void {
    if (this.custId) {
      this.customerService.getCustomerById(this.custId).subscribe(data => {
        this.currentCustomer = data
      })
      this.LeumitService.getAllLeumitCommitmentsByCustId(this.custId).subscribe(data => {
        this.allLeumitCommitments = data

      })
      this.leumitCommimentTypesService.getAllLeumitCommitmentType().subscribe(data => {
        this.allLeumitType = data
      })
    } 

  }
  downloadFile(leumit: LeumitCommitments): void {
    if (leumit.fileUploadId)
      this.fileService.getFile(leumit.fileUploadId).subscribe(
        response => {
          const blob = new Blob([response], { type: response.type });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'קובץ התחייבות לאומית';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        },
        error => console.log('Download error', error)
      );

  }
  deleteFile(leumit: LeumitCommitments) {
    if (leumit.fileUploadId)
      this.fileService.deleteFile(leumit.fileUploadId).subscribe();
    leumit.fileUploadId = null

    this.LeumitService.updateLeumit(leumit).subscribe(data => {
    })
  }
  save(leumit: LeumitCommitments) {
    this.clickSave = true
    if (this.areAllFieldsFilled(leumit)) {
      this.LeumitService.updateLeumit(leumit).subscribe(data => {
        location.reload();
      })
    }
  }
  addLeumit() {
    console.log("addLeumit");
    
    this.clickSave = true
    if (this.areAllFieldsFilled(this.newLeumitCommitments))
      this.newLeumitCommitments.isActive = true
    if (this.custId)
      this.newLeumitCommitments.customerId = this.custId
    this.newLeumitCommitments.customerId = 3
    this.LeumitService.addLeumit(this.newLeumitCommitments).subscribe(data => {
      location.reload();
    })

  }
  addFile(event: any, leumit: LeumitCommitments): void {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.fileService.uploadFile(formData).subscribe(data => {

      leumit.fileUploadId = data.id
      leumit.isActive = true
      this.LeumitService.updateLeumit(leumit).subscribe(data => {
      })
    }
    )
  }
  cancelation() {
    location.reload();
  }
  setCurrentLeumit(LeumitCommitments: any) {
    this.currentLeumit = LeumitCommitments;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('registrationForm') as HTMLElement;
    fileInput.click();
  }
  addNewCommit() {
    this.newCommiment = true
  }
  cancelationNewL() {
    this.newCommiment = false
  }
  addFileToNewLeumit(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    this.fileService.uploadFile(formData).subscribe(data => {
      this.newLeumitCommitments.fileUploadId = data.id
      this.newLeumitCommitments.isActive = true
    }
    )
  }
  areAllFieldsFilled(leumitCommitments: LeumitCommitments): boolean {
    if (leumitCommitments.id != "" &&
      leumitCommitments.commitmentTypeId != 0 &&
      leumitCommitments.commitmentTz != "" && 
      leumitCommitments.validity!= "" && 
      leumitCommitments.birthDate != ""){
      return true
    }
    return false
  }
}
