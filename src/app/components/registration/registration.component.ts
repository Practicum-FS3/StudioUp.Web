import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration/registration.service';
import { Customer } from '../../models/Customer';
import { Training } from '../../models/Training';
import { HMO } from '../../models/HMO';
import { PaymentOption } from '../../models/PaymentOption';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, startWith, Observable, Subscription } from 'rxjs';
import { SubscriptionType } from '../../models/SubscriptionType';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {
  resetRegistrationForm,
  setRegistrationForm,
} from '../../store/actions';
import { State } from '../../store/reducer';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  trainings!: Training[];
  subscriptionTypes!: SubscriptionType[];
  paymentOptions!: PaymentOption[];
  HMOs!: HMO[];
  private customer!: Customer | null;
  form!: FormGroup;
  private formDataSelector: any;
  private formData: any;
  private formSubscription!: Subscription;
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
    private fb: FormBuilder,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      hmo: [''],
      training: ['', Validators.required],
      customer: ['', Validators.required],
      paymentOption: ['', Validators.required],
      fullName: ['', Validators.required],
      address: [''],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^0[2-9]\\d{7}$|^05\\d{8}$|^077\\d{7}$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
    this.formDataSelector = this.store.pipe(select('registrationForm'));
    this.formData = this.formDataSelector.actionsObserver._value.formData;
    if (this.formData) {
      this.form.patchValue(this.formData);
    }
  
    this.formSubscription = this.form.valueChanges.subscribe((formData) => {
      this.store.dispatch(setRegistrationForm({ formData }));
    });

    const emailControl = this.form.get('email');
    if (emailControl) {
      this.filteredEmails = emailControl.valueChanges.pipe(
        startWith(''),
        map((value: string) => this._filter(value))
      );
    }

    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  private fetchData(): void {
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
      .subscribe((paymentOptions: PaymentOption[]) => {
        this.paymentOptions = paymentOptions;
      });
    this.registrationService.getHMOs().subscribe((HMOs: HMO[]) => {
      this.HMOs = HMOs;
    });
  }

  mapDataForSelects(data: any[]): string[] {
    return data?.map((value: any) => value.title);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
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
    if (this.form.valid) {
      this.customer = {
        firstName: this.firstName(this.form.value.fullName),
        lastName: this.lastName(this.form.value.fullName),
        id: this.form.value.ID,
        subscriptionTypeId: this.convertValueToId(
          this.subscriptionTypes,
          this.form.value.subscriptionTypeId
        ),
        customerTypeId: this.convertValueToId(
          this.customerTypes,
          this.form.value.customerType
        ),
        paymentOptionId: this.convertValueToId(
          this.paymentOptions,
          this.form.value.paymentOption
        ),
        hmoId: this.convertValueToId(this.HMOs, this.form.value.hmo),
        address: this.form.value.city + ', ' ?? '' + this.form.value.street ?? '',
        tel: this.form.value.phone,
        email: this.form.value.email,
        isActive: true,
      };
      console.log('Customer registration data:', this.customer); // Make API call to register customer
      this.registrationService.customerRegistration(this.customer); // Reset form fields
      this.customer = null;
      this.form.reset();
      this.store.dispatch(resetRegistrationForm());
    } else {
      this.form.markAllAsTouched();
    }
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    this.store.dispatch(resetRegistrationForm());
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
