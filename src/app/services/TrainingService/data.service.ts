import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Training } from '../../models/Training';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://localhost:7101'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Training>> {
    return this.http.get<Array<Training>>(`${this.baseUrl}/api/Training/forCalander`)
  }

}




