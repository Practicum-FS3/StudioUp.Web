import { Component } from '@angular/core';
import { HMO } from '../../../models/HMO';
import { Customer } from '../../../models/Customer ';
import { CustomerType } from '../../../models/CustomerType ';
import { PaymentOptions } from '../../../models/PaymentOptions';
import { SubscriptionType } from '../../../models/SubscriptionType';
import { FormControl, FormGroup } from '@angular/forms';
import {DataService} from '../../../services/data.service'

@Component({
  selector: 'app-editing-files',
  templateUrl: './editing-files.component.html',
  styleUrl: './editing-files.component.scss'
})
export class EditingFilesComponent {
  myForm: FormGroup
  toedit: boolean = false;
  currentCustomer!: Customer;
  arrCustType!: CustomerType[];
  arrHMO!: HMO[];
  arrPaymentOptions!: PaymentOptions[];
  arrSubscriptionType!: SubscriptionType[]; 

  constructor(private dataService: DataService ) {
    this.myForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      customerTypeId: new FormControl(''),
      hmoId: new FormControl(),
      paymentOptionId: new FormControl(''),
      subscriptionTypeId: new FormControl(''),
      isActive: new FormControl(true),
      tel: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      selectedCategory: new FormControl('')
    })
  }

  getCustomerTypeTitle(): string |undefined{
    if (this.currentCustomer && this.arrCustType) {
      const customerType = this.arrCustType.find(c => c.id === this.currentCustomer.customerTypeId);
      return customerType ? customerType.title : '';
    }
    return '';
  }

  getSubscriptionTypeTitle(): string |undefined{
    if (this.currentCustomer && this.arrSubscriptionType) {
      const subscriptionType = this.arrSubscriptionType.find(c => c.id === this.currentCustomer.subscriptionTypeId);
      return subscriptionType ? subscriptionType.title : '';
    }
    return '';
  }

  getHmoTitle(): string |undefined{
    if (this.currentCustomer && this.arrHMO) {
      const  hmo= this.arrHMO.find(c => c.id === this.currentCustomer.hmoId);
      return hmo ? hmo.title : '';
    }
    return '';
  }

  getPaymentOptionTitle(): string |undefined{
    if (this.currentCustomer && this.arrPaymentOptions) {
      const  paymentOption= this.arrPaymentOptions.find(c => c.id === this.currentCustomer.paymentOptionId);
      return paymentOption ? paymentOption.title : '';
    }
    return '';
  }

  ngOnInit(): void {
    this.dataService.getCustByID().subscribe(data=>{
      this.currentCustomer=data
    })

    this.dataService.getAllCustType().subscribe(data=>{
      this.arrCustType=data
    })
    // this.dataService.getAllCustType().subscribe(data=>{
    //   this.arrHMO=data
    // })
  
    this.dataService.getAllPaymentOptions().subscribe(data=>{
      this.arrPaymentOptions=data
    })
  
    this.dataService.getAllSubscriptionType().subscribe(data=>{
      this.arrSubscriptionType=data
    })
  }
  
 
  edit() {
    this.toedit = true;
  }
  saveChanges() {
    const { controls } = this.myForm
    let cust: Customer = new Customer(
      controls['firstName'].value,
      controls['lastName'].value,
      controls['customerTypeId'].value,
      controls['hmoId'].value,
      controls['paymentOptionId'].value,
      controls['subscriptionTypeId'].value,
      controls['isActive'].value,
      controls['tel'].value,
      controls['address'].value,
      controls['email'].value
    )
      cust.id=this.currentCustomer?.id      
      this.dataService.updateCustByID(cust).subscribe(data => {
        this.myForm.reset()
      })
  }
}
