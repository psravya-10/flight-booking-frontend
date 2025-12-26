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
import { ChangePassword } from './profile/change-password/change-password';
import { PasswordExpiryGuard } from './auth/password-expiry.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent ,canActivate: [PasswordExpiryGuard]},
  { path: 'login', component: Login ,canActivate: [PasswordExpiryGuard]},
  { path: 'register', component: Register ,canActivate: [PasswordExpiryGuard]},
  { path: 'profile', component: Profile ,canActivate: [PasswordExpiryGuard]},
  {path: 'change-password',component: ChangePassword},
  { path: 'my-bookings', component: MyBookings ,canActivate: [PasswordExpiryGuard]},
  { path: 'search', component: Search ,canActivate: [PasswordExpiryGuard]},
  { path: 'booking/:flightId', component: Booking,canActivate: [PasswordExpiryGuard] },
  {path: 'admin/add-flight',component: AdminAddFlight,canActivate: [AdminGuard, PasswordExpiryGuard]},
  { path: '**', redirectTo: '' }
];

