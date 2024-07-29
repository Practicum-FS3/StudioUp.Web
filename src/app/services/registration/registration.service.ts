import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/Customer';
import { HMO } from '../../models/HMO';
import { PaymentOption } from '../../models/PaymentOption';
import { Training } from '../../models/Training';
import { SubscriptionType } from '../../models/SubscriptionType';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl: string = 'http://localhost:7101/api';

  constructor(private http: HttpClient) {}
  customerRegistration(customer: Customer | null): void{
    this.http.post(`${this.apiUrl}/Customer`, customer);
  }
  getTrainings(): Observable<Training[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Training`);
  }
  getPaymentOptions(): Observable<PaymentOption[]> {
    return this.http.get<any[]>(`${this.apiUrl}/PaymentOption`);
  }
  getHMOs(): Observable<HMO[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }
  getSubscriptionTypes(): Observable<SubscriptionType[]> {
    return this.http.get<any[]>(`${this.apiUrl}/SubscriptionType`);
  }
}
