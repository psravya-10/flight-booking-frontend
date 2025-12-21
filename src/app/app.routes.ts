import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Search } from './flight/search/search';
import { Booking } from './flight/booking/booking';
import { Profile } from './profile/profile';
import { AdminGuard } from './auth/admin.guard';
import { AdminAddFlight } from './admin/add-flight/add-flight';
import { MyBookings } from './flight/my-bookings/my-bookings';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: 'my-bookings', component: MyBookings },
  { path: 'search', component: Search },
  { path: 'booking/:flightId', component: Booking },
  {path: 'admin/add-flight',component: AdminAddFlight,canActivate: [AdminGuard]},
  { path: '**', redirectTo: '' }
];

