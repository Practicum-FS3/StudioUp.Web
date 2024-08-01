import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration/registration.service';
import { Customer } from '../../models/Customer';
import { Training } from '../../models/Training';
import { HMO } from '../../models/HMO';
import { PaymentOption } from '../../models/PaymentOption';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith, Observable } from 'rxjs';
import { SubscriptionType } from '../../models/SubscriptionType';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  trainings!: Training[];
  subscriptionTypes!: SubscriptionType[];
  paymentOptions!: PaymentOption[];
  HMOs!: HMO[];
  private customer!: Customer | null;
  selectsForm!: FormGroup;
  registrationForm!: FormGroup;
  filteredEmails!: Observable<string[]>;
  domains: string[] = [
    'gmail.com',
    'yahoo.com',
    'yahoo.co.il',
    'walla.co.il',
    'outlook.com',
    'hotmail.com',
    'bezeqint.net',
    '012.net.il',
    'netvision.net.il',
    'smile.net.il',
    'zahav.net.il',
    'barak.net.il',
    'actcom.co.il',
  ];
  formSubmitted: boolean = false;

  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectsForm = this.fb.group({
      hmo: [''],
      training: ['', Validators.required],
      customer: ['', Validators.required],
      paymentOption: ['', Validators.required],
    });
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      address: [''],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^0[2-9]\\d{7}$|^05\\d{8}$|^077\\d{7}$'),
        ],
      ],
      email: ['', Validators.email],
    });

    const emailControl = this.registrationForm.get('email');
    if (emailControl) {
      this.filteredEmails = emailControl.valueChanges.pipe(
        startWith(''),
        map((value: string) => this._filter(value))
      );
    }

    this.registrationService
      .getTrainings()
      .subscribe((trainings: Training[]) => {
        this.trainings = trainings;
      });
    this.registrationService
      .getSubscriptionTypes()
      .subscribe((subscriptionTypes: SubscriptionType[]) => {
        this.subscriptionTypes = subscriptionTypes;
      });
    this.registrationService
      .getPaymentOptions()
      .subscribe((paymentOption: PaymentOption[]) => {
        this.paymentOptions = paymentOption;
      });
    this.registrationService.getHMOs().subscribe((HMOs: HMO[]) => {
      this.HMOs = HMOs;
    });
  }

  private _filter(value: string): string[] {
    if (!value) return [];
    const [name, domain] = value.split('@');
    if (domain) {
      return this.domains
        .filter((d) => d.startsWith(domain))
        .map((d) => `${name}@${d}`);
    } else {
      return this.domains.map((d) => `${value}@${d}`);
    }
  }

  customerRegistration(): void {
    this.formSubmitted = true;
    if (this.registrationForm.valid) {
      console.log('Form Submitted', this.registrationForm.value);
      this.customer = {
        subscriptionTypeId: this.selectsForm.value.customer.id,
        paymentOptionId: this.selectsForm.value.paymentOption.id,
        hmoId: this.selectsForm.value.hmo.id,
        firstName: this.firstName(this.registrationForm.value.fullName),
        lastName: this.lastName(this.registrationForm.value.fullName),
        address: this.registrationForm.value.address ?? '',
        phone: this.registrationForm.value.phone,
        email: this.registrationForm.value.email ?? '',
      };
      console.log('Customer registration data:', this.customer);
      // Make API call to register customer
      this.registrationService.customerRegistration(this.customer);
      // Reset form fields
      this.customer = null;
      this.registrationForm.reset();
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  firstName(fullName: string): string {
    const splitName = fullName.trim().split(' ');
    return splitName.length > 2 ? fullName : splitName[0];
  }

  lastName(fullName: string): string {
    const splitName = fullName.trim().split(' ');
    return splitName.length > 2 ? '' : splitName[1];
  }
}
