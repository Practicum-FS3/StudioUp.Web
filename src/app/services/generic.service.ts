import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentType } from '../models/contentType';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  apiUrl: string = 'https://localhost:7101/api/ContentType/'
  constructor(private http:HttpClient) { }
  getByIdWithContent(id:number):Observable<ContentType>{
    console.log('log');
    
    console.log({id});
    
    return this.http.get<ContentType>(`${this.apiUrl}GetByIdWithContentSection/${id}`)
  }
  GetByIdWithContentSectionHPOnly(id:number):Observable<ContentType>{
    return this.http.get<ContentType>(`${this.apiUrl}GetByIdWithContentSectionHPOnly/${id}`)
  }
}
