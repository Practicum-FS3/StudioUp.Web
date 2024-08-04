
import { Hmos } from './../../models/hmos-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HmosService {

  constructor(private _httpService: HttpClient) { }

  baseUrl: string = "https://localhost:7101/api/HMO/"

  // https://localhost:7101/api/HMO/GetAll 
  getAllHmosFromServer(): Observable<Hmos[]> {
    return this._httpService.get<Hmos[]>(`${this.baseUrl}GetAll`);
  }

  // https://localhost:7101/api/HMO/GetById/id
  getHmosByIdFromServer(hmoId: number): Observable<Hmos> {
    return this._httpService.get<Hmos>(`${this.baseUrl}GetById/${hmoId}`);
  }

  // https://localhost:7101/api/HMO/Add
  addHmosToServer(hmo: Hmos): Observable<Hmos> {
    return this._httpService.post<Hmos>(`${this.baseUrl}Add`, hmo);
  }

  // https://localhost:7101/api/HMO/Update/id
  updateHmosInServer(hmo: Hmos): Observable<boolean> {
    return this._httpService.put<boolean>(`${this.baseUrl}Update/${hmo.ID}`, hmo);
  }

  // https://localhost:7101/api/HMO/Delete/id
  deleteHmoFromServer(hmoId: number): Observable<boolean> {
    return this._httpService.delete<boolean>(`${this.baseUrl}Delete/${hmoId}`);
  }
}
