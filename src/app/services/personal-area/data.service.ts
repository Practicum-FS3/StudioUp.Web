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


  getAllCustType(): Observable<Array<CustomerType>> {
    const data = this.http.get<Array<CustomerType>>(`${this.baseUrl}/CustomerType/GetAllCustomerTypes`)    
    return data
  }

  getAllHMO(): Observable<Array<HMO>> {
    const data = this.http.get<Array<HMO>>(`${this.baseUrl}/HMO`)
    return data

  }

  getAllPaymentOptions(): Observable<Array<PaymentOptions>> {
    const data = this.http.get<Array<PaymentOptions>>(`${this.baseUrl}/PaymentOption/GetPaymentOptions`)
    return data
  }

  getAllSubscriptionType(): Observable<Array<SubscriptionType>> {
    const data = this.http.get<Array<SubscriptionType>>(`${this.baseUrl}/SubscriptionType/GetSubscriptionTypes`)
    return data
  }
  getAllAvailableTraining(): Observable<Array<AvailableTraining>> {
    return this.http.get<Array<AvailableTraining>>(`${this.baseUrl}/AvailableTraining/forCalander`)
  }

  getCustByID(customerID: number): Observable<Customer> {
    const data = this.http.get<Customer>(`${this.baseUrl}/Customer/GetCustomerById/${customerID}`)
    return data
  }

  updateCustByID(customer: Customer): Observable<Customer> {
    const data =  this.http.put<Customer>(`${this.baseUrl}/Customer/UpdateCustomer`, customer);
    return data
  }

  GetAllTrainingsDetailsForCustomer(customerID: number): Observable<Array<AvailableTraining>> {
    return this.http.get<Array<AvailableTraining>>(`${this.baseUrl}/AvailableTraining/GetAllTrainingsDetailsForCustomerAsync/${customerID}`);
  }
}





