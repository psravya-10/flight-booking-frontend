import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Search } from './flight/search/search';
import { Booking } from './flight/booking/booking';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'search', component: Search },
   { path: 'booking/:flightId', component: Booking },
  { path: '**', redirectTo: '' }
];

