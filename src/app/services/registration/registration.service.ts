import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Customer } from '../../models/Customer';
import { HMO } from '../../models/HMO';
import { PaymentOption } from '../../models/PaymentOption';
import { SubscriptionType } from '../../models/SubscriptionType';
import { CustomerType } from '../../models/CustomerType ';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl: string = 'http://localhost:7101/api';

  constructor(private http: HttpClient) {}
  customerRegistration(customer: Customer | null): void {
    this.http.post(`${this.apiUrl}/Customer/AddCustomer`, customer);
  }
  getPaymentOptions(): Observable<PaymentOption[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/PaymentOption/GetPaymentOptions`)
      .pipe(shareReplay(1));
  }
  getHMOs(): Observable<HMO[]> {
    return this.http.get<any[]>(`${this.apiUrl}/HMO`).pipe(shareReplay(1));
  }
  getSubscriptionTypes(): Observable<SubscriptionType[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/SubscriptionType/GetSubscriptionTypes`)
      .pipe(shareReplay(1));
  }
  getCustomerTypes(): Observable<Customer[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/CustomerType/GetAllCustomerTypes`)
      .pipe(shareReplay(1));
  }
}
