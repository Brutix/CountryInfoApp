import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableCountry } from '../interfaces/interfaces'
import { environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private availableCountriesUrl = environment.availableCountriesUrl;
  private holidayApiUrl = environment.holidayApiUrl;
  constructor( private http: HttpClient) {
  }

  getAvailableCountries(): Observable<AvailableCountry[]> {
    return this.http.get<AvailableCountry[]>(this.availableCountriesUrl);
  }

  getCountryHolidays(countryCode: string, year: number): Observable<any> {
    return this.http.get(`${this.holidayApiUrl}/${year}/${countryCode}`);
  }
}
