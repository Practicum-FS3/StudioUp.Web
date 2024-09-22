import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerHMOS } from '../../models/CustomerHMOS';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalAreaHMOService {
  private apiUrl = `https://localhost:7101/api/CustomerHMOS`;

  constructor(private http: HttpClient) { }

  getAllCustomerHMOS(): Observable<CustomerHMOS[]> {
    return this.http.get<CustomerHMOS[]>(`${this.apiUrl}/GetAllCustomerHMOS`);
  }
  getCustomerHMOSById(id: number): Observable<CustomerHMOS> {
    return this.http.get<CustomerHMOS>(`${this.apiUrl}/GetCustomerHMOSByID/${id}`);
  }

  addCustomerHMOS(customerHMOS: CustomerHMOS | null): Observable<CustomerHMOS> {
    return this.http.post<CustomerHMOS>(`${this.apiUrl}/AddCustomerHMO`, customerHMOS);
  }

  updateCustomerHMOS(id: number | undefined, customerHMOS: CustomerHMOS | null): Observable<CustomerHMOS> {
    return this.http.put<CustomerHMOS>(`${this.apiUrl}/UpdateCustomerHMOS`, customerHMOS);
  }

  deleteCustomerHMOS(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteCustomerHMOS/${id}`);
  }
}
