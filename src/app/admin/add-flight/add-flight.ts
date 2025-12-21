import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FlightService } from '../../flight/flight.service';
import { Router } from '@angular/router';

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

  submit() {
    if (this.flightForm.invalid) {
      this.flightForm.markAllAsTouched();
      return;
    }

    const payload = this.flightForm.value;

    this.flightService.addFlight(payload).subscribe({
      next: () => {
        this.successMsg = 'Flight added successfully';
        this.errorMsg = '';

        setTimeout(() => {
          this.router.navigate(['/search']);
        }, 1000);
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Failed to add flight';
        this.successMsg = '';
      }
    });
  }
}
