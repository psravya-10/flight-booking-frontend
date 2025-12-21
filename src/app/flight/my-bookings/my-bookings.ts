import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../booking/bookingservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings {
  constructor(
    private cdr:ChangeDetectorRef
  ){}
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
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMsg = 'Failed to load booking history';
      }
    });
  }
  getStatus(b: any): string {
  if (b.cancelled === true) return 'CANCELLED';

  const today = new Date();
  const journey = new Date(b.journeyDate);

  return journey < today ? 'COMPLETED' : 'UPCOMING';
}


markAsCancelled(pnr: string) {
  const booking = this.bookings.find(b => b.pnr === pnr);
  if (booking) {
    booking.cancelled = true;
  }
}

cancelBooking(pnr: string) {
  if (!confirm(`Cancel ticket ${pnr}?`)) return;

  this.bookingService.cancelBooking(pnr).subscribe({
    next: () => {
      
      const booking = this.bookings.find(b => b.pnr === pnr);
      if (booking) {
        booking.cancelled = true;
      }
    },
    error: (err) => {
      if (err?.error?.message?.toLowerCase().includes('already')) {
        const booking = this.bookings.find(b => b.pnr === pnr);
        if (booking) {
          booking.cancelled = true;
        }
      }
    }
  });
}

}
