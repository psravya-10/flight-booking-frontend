import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FlightService } from '../../flight/flight.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-admin-add-flight',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-flight.html',
  styleUrls: ['./add-flight.css']
})
export class AdminAddFlight {

  private fb = inject(FormBuilder);
  private flightService = inject(FlightService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);


  successMsg = '';
  errorMsg = '';

  flightForm = this.fb.group({
    airlineName: ['', Validators.required],
    flightNumber: ['', Validators.required],
    fromPlace: ['', Validators.required],
    toPlace: ['', Validators.required],
    departureTime: ['', Validators.required],
    arrivalTime: ['', Validators.required],
    priceOneWay: ['', [Validators.required, Validators.min(1)]],
    totalSeats: ['', [Validators.required, Validators.min(1)]],
    tripType: ['ONE_WAY', Validators.required]
  });

  minDepartureDateTime = '';
minArrivalDateTime = '';

ngOnInit() {
  this.setMinDepartureDateTime();

  // Update arrival min when departure changes
  this.flightForm.get('departureTime')?.valueChanges.subscribe(value => {
    if (value) {
      this.minArrivalDateTime = value;
      this.flightForm.get('arrivalTime')?.reset();
    }
  });
}

private setMinDepartureDateTime() {
  const now = new Date();

  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');

  this.minDepartureDateTime = `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}


  submit() {
    if (this.flightForm.invalid) {
      this.flightForm.markAllAsTouched();
      return;
    }
    const { departureTime, arrivalTime } = this.flightForm.value;

  if (new Date(arrivalTime!) <= new Date(departureTime!)) {
    this.errorMsg = 'Arrival time must be after departure time';
    this.successMsg = '';
    return;
  }

    const payload = this.flightForm.value;

    this.flightService.addFlight(payload).subscribe({
      next: (response) => {
        console.log('ADD FLIGHT SUCCESS');
       if (response.status === 200 || response.status === 201){ 
        this.successMsg = 'Flight added successfully';
        this.cdr.detectChanges();
        this.errorMsg = '';

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      }},
      error: (err) => {
        console.log('ADD FLIGHT ERROR', err);
        this.errorMsg = err?.error?.message || 'Failed to add flight';
        this.cdr.detectChanges();
        this.successMsg = '';
      }
    });
  }
}
