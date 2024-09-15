import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = `${environment.apiUrl}/email`; 

  constructor(private http: HttpClient) { }

  sendEmail(toAddress: string, subject: string, body: string): Observable<any> {
    const emailRequest = {
      toAddress: toAddress,
      subject: subject,
      body: body
    };

    return this.http.post(`${this.apiUrl}/send`, emailRequest);
  }


}
