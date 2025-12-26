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
  constructor(private cdr:ChangeDetectorRef ){}
  private flightService = inject(FlightService);
  private route = inject(ActivatedRoute);
  // rows = ['A', 'B', 'C', 'D', 'E', 'F'];   
  // cols = [1, 2, 3, 4, 5, 6];              

  // bookedSeats: string[] = [];
  // selectedSeats: string[] = [];
  totalSeats = 0;
allSeats: number[] = [];
bookedSeats: number[] = [];
selectedSeats: number[] = [];


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
    const nav = history.state;
  this.totalSeats = nav?.totalSeats || 0;

  this.allSeats = Array.from(
    { length: this.totalSeats },
    (_, i) => i + 1
  );

  //  Get already booked seats
  this.flightService.getBookedSeats(this.flightId)
    .subscribe(seats => {
      this.bookedSeats = seats.map(s => Number(s));
    });
   
  }

  updatePassengers() {
  const count = this.booking.numberOfSeats || 1;

  this.booking.passengers = Array.from({ length: count }, () => ({
    name: '',
    gender: '',
    age: null
  }));

  this.selectedSeats = [];
  this.booking.seatNumbers = '';
}
bookingFormReset() {
  this.booking = {
    customerName: '',
    email: '',
    numberOfSeats: 1,
    journeyDate: '',
    seatNumbers: '',
    mealPreference: 'VEG',
    passengers: [{ name: '', gender: '', age: null }]
  };
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
        
        // this.pnr = res?.pnr || 'PNR_GENERATED';
        this.pnr = res.pnr;
        console.log('Booking response:', res);
        this.bookingFormReset();

        this.isBooking = false;   
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.error(err);
        this.errorMsg = err?.error?.message || 'Booking failed';
        this.isBooking = false;  
        this.cdr.detectChanges();
      }
    });
}
canBook(): boolean {
  return this.selectedSeats.length === this.booking.numberOfSeats;
}
toggleSeat(seat: number) {
  if (this.bookedSeats.includes(seat)) return;

  if (this.selectedSeats.includes(seat)) {
    this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
  } else {
    if (this.selectedSeats.length >= this.booking.numberOfSeats) return;
    this.selectedSeats.push(seat);
  }

  this.booking.seatNumbers = this.selectedSeats.join(',');
}



}
