import { Component } from '@angular/core';
import { Holiday } from '../../interfaces/interfaces';
import { CountryService }  from '../../services/country.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton } from '@angular/material/button';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatButton,
    MatTable,
    DatePipe,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent {
  countryCode: string = '';
  countryName: string = '';
  holidays: Holiday[] = [];
  selectedYear: number;
  years: number[] = [];
  isLoadingHolidays: boolean = false;


  constructor(
    private countryService: CountryService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.selectedYear = new Date().getFullYear();
    this.years = Array.from({ length: 11 }, (_, i) => 2020 + i); // 2020-2030
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const code = params.get('code');
      if (code) {
        this.countryCode = code.toUpperCase();
        this.getHolidays(this.selectedYear);
        this.getCountryName(code);
      }
    });
  }

  /**
   * Fetches the holidays for the selected country and year.
   * @param year The year for which to fetch holidays.
   */

  getHolidays(year: number): void {
    this.selectedYear = year;
    this.holidays = []; // Reset holidays
    this.isLoadingHolidays = true;
    this.countryService.getCountryHolidays(this.countryCode, year).subscribe(
      (data) => {
        this.holidays = data;
        this.isLoadingHolidays = false;
      },
      (error) => {
        console.error('Error fetching holidays', error);
        this.isLoadingHolidays = false;
      }
    );
  }

  /**
   * Retrieves the country name based on the country code.
   * @param code The country code.
   */
  getCountryName(code: string): void {
    this.countryService.getAvailableCountries().subscribe(
      (countries) => {
        const country = countries.find(c => c.countryCode.toUpperCase() === code.toUpperCase());
        this.countryName = country ? country.name : code;
      },
      (error) => {
        console.error('Error fetching available countries', error);
        this.countryName = code;
      }
    );
  }

  /**
   * Handles the selection of a different year.
   * @param year The selected year.
   */
  onYearSelected(year: number): void {
    this.getHolidays(year);
  }

  goBack(): void {
    this.location.back();
  }

}


