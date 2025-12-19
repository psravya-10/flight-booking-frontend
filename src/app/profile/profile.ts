import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { BookingService } from '../flight/booking/bookingservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {

  private bookingService = inject(BookingService);
  private router = inject(Router);

  email = '';
  bookings: any[] = [];
  errorMsg = '';

  ngOnInit() {
    const email = localStorage.getItem('email');

    if (!email) {
      this.router.navigate(['/login']);
      return;
    }

    this.email = email;
    this.loadHistory();
  }

  loadHistory() {
    this.bookingService.getHistory(this.email).subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: () => {
        this.errorMsg = 'Failed to load booking history';
      }
    });
  }
  getStatus(b: any): string {
    if (b.status === 'CANCELLED') {
      return 'CANCELLED';
    }

    const today = new Date();
    const journey = new Date(b.journeyDate);

    if (journey < today) {
      return 'COMPLETED';
    }

    return 'UPCOMING';
  }
  cancelBooking(pnr: string) {
    if (!confirm('Cancel this booking?')) return;

    this.bookingService.cancelBooking(pnr).subscribe({
      next: () => {
        alert('Booking cancelled');
        this.loadHistory();

      },
      error: () => {
        alert('Cancel failed');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
