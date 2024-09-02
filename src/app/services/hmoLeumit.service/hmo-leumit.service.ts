import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable ,map} from 'rxjs';
import { LeumitCommitments } from '../../models/leumit-commitments';

@Injectable({
  providedIn: 'root'
})
export class HmoLeumitService {
baseUrl :string = 'https://localhost:7101/api/LeumitCommitments'
  constructor(private http:HttpClient) { }
  getAllLeumitCommitments():Observable<Array<LeumitCommitments>>{
    return this.http.get<Array<LeumitCommitments>>(`${this.baseUrl}/GetAllLeumitCommitments`);
  }
  getAllLeumitCommitmentsByCustId(custId:Number):Observable<LeumitCommitments[]>{
    return this.getAllLeumitCommitments()
    .pipe(
      map((commitments: LeumitCommitments[]) => commitments.filter(commitment => { 
        return commitment.customerId === custId}))
    );
  }

  updateLeumit(leumit:LeumitCommitments):Observable<LeumitCommitments>{
    return this.http.put<LeumitCommitments>(`${this.baseUrl}/UpdateLeumitCommitment`,leumit,
      {headers: { 'content-type': "application/json" }}
    );
  }
  addLeumit(leumit:LeumitCommitments):Observable<LeumitCommitments>{
    return this.http.post<LeumitCommitments>(`${this.baseUrl}/AddLeumitCommitment`,leumit,
      {headers: { 'content-type': "application/json" }}
    );
  }
}
