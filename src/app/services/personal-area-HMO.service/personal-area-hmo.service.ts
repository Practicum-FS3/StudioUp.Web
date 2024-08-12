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
    return this.http.get<CustomerHMOS[]>(`${this.apiUrl}/GetCustomerHMOS`);
  }
  getCustomerHMOSById(id: number): Observable<CustomerHMOS> {
    return this.http.get<CustomerHMOS>(`${this.apiUrl}/GetCustomerHMOSByID/${id}`);
  }

  addCustomerHMOS(customerHMOS: CustomerHMOS | null): Observable<CustomerHMOS> {
    return this.http.post<CustomerHMOS>(`${this.apiUrl, customerHMOS}/CreateCustomerHMOS`, customerHMOS); // ודאי שהטיפוס נכון כאן
  }

  updateCustomerHMOS(id: number | undefined, customerHMOS: CustomerHMOS | null): Observable<CustomerHMOS> {
    return this.http.put<CustomerHMOS>(`${this.apiUrl}/UpdateCustomerHMOS/${id}`, customerHMOS);
  }

  deleteCustomerHMOS(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteCustomerHMOS/${id}`);
  }
}
