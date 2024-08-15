import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeumitCommimentTypes } from '../../models/leumit-commiment-types';

@Injectable({
  providedIn: 'root'
})
export class LeumitCommimentTypesService {
  baseUrl :string = 'https://localhost:7101/api/LeumitCommimentTypes'

  constructor(private http:HttpClient) { }
  getLeumitCommitmentTypeById(id:string):Observable<LeumitCommimentTypes>{
    return this.http.get<LeumitCommimentTypes>(`${this.baseUrl}/GetLeumitCommitmentTypesById${id}`);
  }
  getAllLeumitCommitmentType():Observable<LeumitCommimentTypes[]>{
    return this.http.get<LeumitCommimentTypes[]>(`${this.baseUrl}/GetAllLeumitCommitments`);
  }
}
