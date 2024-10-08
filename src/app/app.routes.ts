import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CountryComponent } from './components/country/country.component';
import { LoginComponent } from './components/login/login.component';
import * as path from 'path';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: '/', component: HomeComponent,
      children:
        [
        { path: 'country/:code', component: CountryComponent },
        ]
  },
  { path: 'country/:code', component: CountryComponent },
  { path: '**', redirectTo: '' } // Wildcard route redirects to Home
];
