import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvailableCountry } from '../../interfaces/interfaces';
import { CountryService }  from '../../services/country.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    MatProgressSpinner,
    DatePipe,
    MatButton
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  searchTerm: string = '';
  errorMessage: string = '';
  filteredCountries: AvailableCountry[] = [];
  availableCountries: AvailableCountry[] = [];
  currentYear: number = new Date().getFullYear();
  isLoadingRandomCountries: boolean = false;

  randomCountries: Array<{
    country: AvailableCountry,
    holiday: any
  }> = [];

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    // Fetch all available countries on initialization
    this.countryService.getAvailableCountries().subscribe(
      (countries) => {
        this.availableCountries = countries;
        this.loadRandomCountries();
      },
      (error) => {
        console.error('Error fetching available countries', error);
      }
    );
  }

  onSearchTermChange(): void {
    if (this.searchTerm.trim().length === 0) {
      this.filteredCountries = [];
      this.errorMessage = '';
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredCountries = this.availableCountries.filter(country =>
      country.name.toLowerCase().includes(term) || country.countryCode.toLowerCase().includes(term)
    ).slice(0, 10); // Limit to 10 suggestions

    if (this.filteredCountries.length === 0) {
      this.errorMessage = 'No countries found matching your search.';
    } else {
      this.errorMessage = '';
    }
  }

  // * Loads three random countries and fetches their next holiday.
  loadRandomCountries(): void {
    if (this.availableCountries.length < 3) return;

    this.isLoadingRandomCountries = true;

    // Shuffle the array without mutating the original
    const shuffled = [...this.availableCountries].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    // Clear previous randomCountries
    this.randomCountries = [];

    let requestsCompleted = 0;

    selected.forEach(country => {
      this.countryService.getCountryHolidays(country.countryCode, this.currentYear).subscribe(
        (holidays) => {
          const today = new Date();
          const sortedHolidays = holidays.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
          const nextHoliday = sortedHolidays.find((holiday: any) => new Date(holiday.date) >= today);
          if (nextHoliday) {
            this.randomCountries.push({
              country,
              holiday: nextHoliday
            });
          } else if (holidays.length > 0) {
            const firstHoliday = sortedHolidays[0];
            this.randomCountries.push({
              country,
              holiday: firstHoliday
            });
          }
          requestsCompleted++;
          if (requestsCompleted === selected.length) {
            this.isLoadingRandomCountries = false;
          }
        },
        (error) => {
          console.error(`Error fetching holidays for ${country.name}`, error);
          requestsCompleted++;
          if (requestsCompleted === selected.length) {
            this.isLoadingRandomCountries = false;
          }
        }
      );
    });
  }


}
