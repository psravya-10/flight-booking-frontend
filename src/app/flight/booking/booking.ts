import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../flight.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking {
  constructor(
    private cdr:ChangeDetectorRef
  ){}
  private flightService = inject(FlightService);
  private route = inject(ActivatedRoute);

  flightId!: string;

  errorMsg = '';
  pnr = '';
  isBooking = false;   

  booking = {
    customerName: '',
    email: '',
    numberOfSeats: 1,
    journeyDate: '',
    seatNumbers: '',
    mealPreference: 'VEG',
    passengers: [
      { name: '', gender: '', age: null }
    ]
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('flightId');
    if (!id) {
      this.errorMsg = 'Invalid flight selected';
      return;
    }
    this.flightId = id;
  }

  updatePassengers() {
    const count = this.booking.numberOfSeats || 1;
    this.booking.passengers = Array.from({ length: count }, () => ({
      name: '',
      gender: '',
      age: null
    }));
  }

  submitBooking(form: any) {
  if (form.invalid || this.isBooking) return;

  this.isBooking = true;
  this.errorMsg = '';
  this.pnr = '';

  this.flightService
    .bookFlight(this.flightId, this.booking)
    .subscribe({
      next: (res: any) => {
        
        this.pnr = res?.pnr || 'PNR_GENERATED';
        this.isBooking = false;   
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error(err);
        this.errorMsg = err?.error?.message || 'Booking failed';
        this.isBooking = false;  
      }
    });
}

}
