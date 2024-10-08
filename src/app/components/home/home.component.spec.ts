import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let countryService: jasmine.SpyObj<CountryService>;

  beforeEach(async () => {
    const countryServiceSpy = jasmine.createSpyObj('CountryService', ['getAvailableCountries']);

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ { provide: CountryService, useValue: countryServiceSpy } ],
      imports: [ RouterTestingModule, FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    countryService = TestBed.inject(CountryService) as jasmine.SpyObj<CountryService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Тест: компонент повинен створитися
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Тест: повинно викликатися API та отримуватися список країн
  it('should load countries from the service', () => {
    const mockCountries = [
      { name: 'Ukraine', countryCode: 'UA' },
      { name: 'United States', countryCode: 'US' }
    ];

    countryService.getAvailableCountries.and.returnValue(of(mockCountries));
    fixture.detectChanges(); // Виклик ініціалізації компонента

    expect(component.availableCountries.length).toBe(2);
    expect(component.availableCountries[0].name).toBe('Ukraine');
  });

  // Тест: пошук країн повинен працювати
  it('should filter countries based on search query', () => {
    component.availableCountries = [
      { name: 'Ukraine', countryCode: 'UA' },
      { name: 'United States', countryCode: 'US' },
      { name: 'United Kingdom', countryCode: 'UK' }
    ];

    component.searchTerm = 'United';
    component.onSearchTermChange();

    expect(component.filteredCountries.length).toBe(2);
    expect(component.filteredCountries[0].name).toBe('United States');
  });
});
