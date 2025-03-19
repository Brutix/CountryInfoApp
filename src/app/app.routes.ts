import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountryComponent } from './components/country/country.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent, pathMatch: 'full',
      children:
        [
        { path: 'country/:code', component: CountryComponent },
        ]
  },
  { path: 'country/:code', component: CountryComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route redirects to login
];
