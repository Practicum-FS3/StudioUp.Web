import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerSubscription } from '../models/customerSubscription';
import { SubscriptionType } from '../models/SubscriptionType';

@Injectable({
  providedIn: 'root'
})
export class CustomerSubscriptionService {

  private baseUrl: string = 'https://localhost:7101/api/CustomerSubscriptions';

  constructor(private http: HttpClient) { }

  // קבלת כל המנויים
  getAll(): Observable<CustomerSubscription[]> {
    console.log('getAll from service');
    return this.http.get<CustomerSubscription[]>(this.baseUrl);
  }

  // קבלת כל המנויים של לקוח לפי מזהה לקוח
    getByCustomerId(customerId: number): Observable<CustomerSubscription[]> {
      return this.http.get<CustomerSubscription[]>(`${this.baseUrl}/customer/${customerId}`);
    }

  // קבלת מנוי לפי מזהה מנוי
  getById(id: number): Observable<CustomerSubscription> {
    return this.http.get<CustomerSubscription>(`${this.baseUrl}/${id}`);
  }

  // הוספת מנוי חדש ללקוח
  add(subscription: CustomerSubscription): Observable<CustomerSubscription> {
    return this.http.post<CustomerSubscription>(this.baseUrl, subscription);
  }

  // עדכון מנוי קיים ללקוח
  update(id: number, subscription: CustomerSubscription): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, subscription);
  }

  // מחיקת מנוי לפי מזהה מנוי
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  //קבלת פרטי מנוי לפי מזהה מנוי ממנויים ללקוח
  getSubscriptionType(id: number): Observable<SubscriptionType> {
    return this.http.get<SubscriptionType>(`https://localhost:7101/api/subscriptionType/${id}`);
  }
}
