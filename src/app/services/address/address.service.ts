import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private citiesUrl: string =
    'https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&fields=שם_ישוב';
  private streetsUrl: string =
    'https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&fields=שם_רחוב';
  cities!: string[];
  streets!: string[];

  constructor(private http: HttpClient) {}

  getCities(value: string): string[] {
    this.http
      .get<any>(this.citiesUrl)
      .pipe(
        map((response) =>
          response.result.records.filter((c: string) => c.startsWith(value))
        )
      )
      .subscribe((cities: string[]) => (this.cities = cities));
    return this.cities;
  }

  getStreets(value: string, city?: string): string[] {
    if (!city) {
      this.http
        .get<any>(this.streetsUrl)
        .pipe(
          map((response) =>
            response.result.records.filter((s: string) => s.startsWith(value))
          )
        )
        .subscribe((streets: string[]) => (this.streets = streets))
        return this.streets;
    }
    this.http
      .get<any>(`${this.streetsUrl}&filters={"שם_ישוב":"${city}"}`)
      .pipe(
        map((response) =>
          response.result.records.filter((s: string) => s.startsWith(value))
        )
      )
      .subscribe((streets: string[]) => (this.streets = streets))
      return this.streets;
  }
}
