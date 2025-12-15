import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {

  private fb = inject(FormBuilder);
  private flightService = inject(FlightService);
  private cdr = inject(ChangeDetectorRef); 

  flights: any[] = [];
  errorMsg = '';

  searchForm = this.fb.group({
    fromPlace: ['', Validators.required],
    toPlace: ['', Validators.required],
    journeyDate: ['', Validators.required],
    tripType: ['ONE_WAY', Validators.required]
  });

  search() {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.flightService.searchFlights(this.searchForm.value)
      .subscribe({
        next: (data) => {
          this.flights = data;
          this.errorMsg = '';
          this.cdr.detectChanges(); 
        },
        error: () => {
          this.errorMsg = 'No flights found';
          this.flights = [];
          this.cdr.detectChanges();
        }
      });
  }

  newSearch() {
    this.flights = [];
    this.cdr.detectChanges();
  }
}
