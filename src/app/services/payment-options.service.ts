import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentOptions } from '../models/PaymentOption';

@Injectable({
  providedIn: 'root'
})
export class PaymentOptionsService {

  constructor(public http: HttpClient) { }

  basisUrl: string = "https://localhost:7101/api/PaymentOption"

  del(id:number):Observable<void>{

    return this.http.delete<void>(`${this.basisUrl}/${id}`)
  }

  add(po:PaymentOptions):Observable<PaymentOptions>{
  
   
    return this.http.post<PaymentOptions>(`${this.basisUrl}`, po)

  }

  update(po:PaymentOptions, id:number):Observable<void>
  {
   
    return this.http.put<void>(`${this.basisUrl}/${id}`, po)

  }

  getAll():Observable<Array<PaymentOptions>>
  {
   
    return this.http.get<Array<PaymentOptions>>(`${this.basisUrl}`)

  }

  getById(id:number):Observable<PaymentOptions>
  {
   
    return this.http.get<PaymentOptions>(`${this.basisUrl}/${id}`)

  }
}


