import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactMod } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = "https://localhost:7101/api/Contact"

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Array<ContactMod>>
  {
    return this.http.get<Array<ContactMod>>(`${this.apiUrl}/GetAllContacts`)
  }

  getContactById(id: number): Observable<ContactMod>
  {
    return this.http.get<ContactMod>(`${this.apiUrl}/GetContactById${id}`)
  }

  addContact(contact: ContactMod): Observable<ContactMod>
  {
    return this.http.post<ContactMod>(`${this.apiUrl}/AddContact`,contact)
  }
  
  // submitContactForm(contactData: any) {
  //   return this.http.post('/api/contact', contactData);
  // }

}
