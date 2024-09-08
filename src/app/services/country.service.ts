import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableCountry } from '../interfaces/interfaces'



@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private availableCountriesUrl = 'https://date.nager.at/api/v3/AvailableCountries/';
  private holidayApiUrl = 'https://date.nager.at/api/v3/PublicHolidays';
  constructor( private http: HttpClient) {
  }

  getAvailableCountries(): Observable<AvailableCountry[]> {
    return this.http.get<AvailableCountry[]>(this.availableCountriesUrl);
  }

  getCountryHolidays(countryCode: string, year: number): Observable<any> {
    return this.http.get(`${this.holidayApiUrl}/${year}/${countryCode}`);
  }
}
