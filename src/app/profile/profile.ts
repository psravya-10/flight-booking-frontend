import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {

  private http = inject(HttpClient);
  private router = inject(Router);

  email = '';
  bookings: any[] = [];
  errorMsg = '';

  ngOnInit() {
    const storedEmail = localStorage.getItem('email');

    if (!storedEmail) {
      this.router.navigate(['/login']);
      return;
    }

    this.email = storedEmail;
    this.loadBookingHistory();
  }

  loadBookingHistory() {
    this.http.get<any[]>(
      `${environment.API_BASE_URL}/api/booking/history/${this.email}`
    ).subscribe({
      next: data => this.bookings = data,
      error: () => this.errorMsg = 'Unable to load booking history'
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
