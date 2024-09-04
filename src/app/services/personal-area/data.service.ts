import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/Customer ';
import { CustomerType } from '../../models/CustomerType ';
import { PaymentOptions } from '../../models/PaymentOptions';
import { SubscriptionType } from '../../models/SubscriptionType';
import { AvailableTraining } from '../../models/AvailableTrainingCalander';
import { HMO } from '../../models/HMO';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = "https://localhost:7101/api"
  constructor(private http: HttpClient) { }
  getAll(): Observable<Array<Customer>> {
      const data = this.http.get<Array<Customer>>(`${this.baseUrl}/Customer`)
      return data
  }

  getAllCustType(): Observable<Array<CustomerType>> {
    const data = this.http.get<Array<CustomerType>>(`${this.baseUrl}/CustomerType`)    
    return data
  }

  getAllHMO(): Observable<Array<HMO>> {
    const data = this.http.get<Array<HMO>>(`${this.baseUrl}/HMO/GetAll`)
    return data
  }

  getAllPaymentOptions(): Observable<Array<PaymentOptions>> {
    const data = this.http.get<Array<PaymentOptions>>(`${this.baseUrl}/PaymentOption`)
    return data
  }

  getAllSubscriptionType(): Observable<Array<SubscriptionType>> {
    const data = this.http.get<Array<SubscriptionType>>(`${this.baseUrl}/SubscriptionType`)
    return data
  }
  getAllAvailableTraining(): Observable<Array<AvailableTraining>> {
    return this.http.get<Array<AvailableTraining>>(`${this.baseUrl}/AvailableTraining/GetAvailableTrainingsCalender`)
  }

  getCustByID(): Observable<Customer> {
    const data = this.http.get<Customer>(`${this.baseUrl}/Customer/byId/${8}`)
    return data
  }

  updateCustByID(customer: Customer): Observable<Customer> {
    console.log('updateCustByID');
    console.log(customer);
    const c={
      "id": 1,
      "firstName": "הני",
      "lastName": "כהן",
      "customerTypeId": 1,
      "hmoId": 1,
      "paymentOptionId": 1,
      "subscriptionTypeId": 1,
      "isActive": true,
      "tel": "055678856",
      "address": "השושנים 5 גבעתיים",
      "email": "m055678856@gmail.com"
    }
    console.log(c);

    return this.http.put<Customer>(`${this.baseUrl}/Customer`, customer);
   

  }
}





