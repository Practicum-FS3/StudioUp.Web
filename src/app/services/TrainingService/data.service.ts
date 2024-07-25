import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerTypeDTO, Training, TrainingTypeDTO } from '../../models/Training';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  //c# הכתובת עליה הוא רץ -ה
  private baseUrl = 'https://localhost:7101'

  constructor(private http: HttpClient) { }

  // להביא את כל המידע מהקונטרולר
  getAll(): Observable<Array<Training>> {
    return this.http.get<Array<Training>>(`${this.baseUrl}/api/Training`)
  }

  getTrainingType(id: number): Observable<TrainingTypeDTO> {
    // שרשור+לשנות את הכתובת
    return this.http.get<TrainingTypeDTO>(`${this.baseUrl}/api/Training`)
  }
  getCustomerType(id: number): Observable<CustomerTypeDTO> {
    return this.http.get<CustomerTypeDTO>(`${this.baseUrl}/api/Training`)
  }
}




