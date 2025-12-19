import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class Booking {

  private flightService = inject(FlightService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  flightId!: string;

  successMsg = '';
  errorMsg = '';

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
    this.flightId = this.route.snapshot.paramMap.get('flightId')!;
  }

  updatePassengers() {
    const count = this.booking.numberOfSeats;
    this.booking.passengers = Array.from({ length: count }, () => ({
      name: '',
      gender: '',
      age: null
    }));
  }

  pnr="";
  submitBooking(form: any) {
    if (form.invalid) return;

    this.flightService
      .bookFlight(this.flightId, this.booking)
      .subscribe({
        next: (response:any) => {
          this.successMsg = 'Booking successful';
          this.pnr = response.pnr; 
          this.errorMsg = '';
        },
        error: () => {
          this.errorMsg = 'Booking failed';
        }
      });
  }
}
