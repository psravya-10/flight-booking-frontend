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

  submit() {
    if (this.flightForm.invalid) {
      this.flightForm.markAllAsTouched();
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
        }, 800);
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
