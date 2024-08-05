import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentOption } from '../models/PaymentOption';

@Injectable({
  providedIn: 'root'
})
export class PaymentOptionsService {

  constructor(public http: HttpClient) { }

  basisUrl: string = "https://localhost:7101/api/PaymentOption"

  del(id:number):Observable<void>{

    return this.http.delete<void>(`${this.basisUrl}/${id}`)
  }

  add(po:PaymentOption):Observable<PaymentOption>{
  
   
    return this.http.post<PaymentOption>(`${this.basisUrl}`, po)

  }

  update(po:PaymentOption, id:number):Observable<void>
  {
   
    return this.http.put<void>(`${this.basisUrl}/${id}`, po)

  }

  getAll():Observable<Array<PaymentOption>>
  {
   
    return this.http.get<Array<PaymentOption>>(`${this.basisUrl}`)

  }

  getById(id:number):Observable<PaymentOption>
  {
   
    return this.http.get<PaymentOption>(`${this.basisUrl}/${id}`)

  }
}


