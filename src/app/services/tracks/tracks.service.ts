import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from '../../models/Track';

@Injectable({
  providedIn: 'root'
})
export class TracksService {

  private baseUrl = 'https://localhost:7101';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Track>> {
    return this.http.get<Array<Track>>(`${this.baseUrl}/api/SubscriptionType`)
  }

  getById(id:number): Observable<Track>{
    return this.http.get<Track>(`${this.baseUrl}/api/SubscriptionType/${id}`)
  }

}
