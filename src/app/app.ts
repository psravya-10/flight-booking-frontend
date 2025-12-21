import { Component } from '@angular/core';
import { RouterOutlet, RouterLink ,Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink 
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
  goToAddFlight() {
  if (this.router.url !== '/admin/add-flight') {
    this.router.navigate(['/admin/add-flight']);
  }
}


  logout() { 
  localStorage.clear();
  this.router.navigate(['/login']);
  }
}
