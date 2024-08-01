import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerSubscription } from '../models/customerSubscription'; // תיקון לפי המודל שלך

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

  // קבלת מנוי לפי מזהה
  getById(id: number): Observable<CustomerSubscription> {
    return this.http.get<CustomerSubscription>(`${this.baseUrl}/${id}`);
  }

  // הוספת מנוי חדש
  add(subscription: CustomerSubscription): Observable<CustomerSubscription> {
    return this.http.post<CustomerSubscription>(this.baseUrl, subscription);
  }

  // עדכון מנוי קיים
  update(id: number, subscription: CustomerSubscription): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, subscription);
  }

  // מחיקת מנוי לפי מזהה
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
