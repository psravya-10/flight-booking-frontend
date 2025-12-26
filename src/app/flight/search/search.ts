import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlightService } from '../flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {

  private fb = inject(FormBuilder);
  private flightService = inject(FlightService);
  private cdr = inject(ChangeDetectorRef); 
  private router = inject(Router);

  flights: any[] = [];
  errorMsg = '';
  noFlightsMsg = '';
  showResults = false;

  searchForm = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
    journeyDate: ['', Validators.required],
    tripType: ['', Validators.required]
  });

  cities: string[] = [
  'Hyderabad',
  'Bangalore',
  'Chennai',
  'Delhi',
  'Mumbai',
  'Kolkata',
  'Pune',
  'Goa',
  'Ahmedabad'
];

filteredFromCities: string[] = [];
filteredToCities: string[] = [];

showFromList = false;
showToList = false;
filterFromCities(value: string) {
  this.filteredFromCities = this.cities.filter(city =>
    city.toLowerCase().includes(value.toLowerCase())
  );
  this.showFromList = true;
}

filterToCities(value: string) {
  this.filteredToCities = this.cities.filter(city =>
    city.toLowerCase().includes(value.toLowerCase())
  );
  this.showToList = true;
}

selectFromCity(city: string) {
  this.searchForm.patchValue({ from: city });
  this.showFromList = false;
}

selectToCity(city: string) {
  this.searchForm.patchValue({ to: city });
  this.showToList = false;
}
today = new Date().toISOString().split('T')[0];



  search() {
    this.errorMsg = '';
    this.noFlightsMsg = '';
    this.flights = [];

    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    const payload = {
      fromPlace: this.searchForm.value.from,
      toPlace: this.searchForm.value.to,
      journeyDate: this.searchForm.value.journeyDate,
      tripType: this.searchForm.value.tripType
    };

    this.flightService.searchFlights(payload).subscribe({
      next: (data) => {
        if (!data || data.length === 0) {
          this.noFlightsMsg = 'No flights found';
        } else {
          this.flights = data;
          this.showResults = true;   
        }
        this.cdr.detectChanges(); 
      },
      error: () => {
        this.errorMsg = 'Failed to fetch flights';
      }
    });
  }
  newSearch() {
  this.showResults = false;
  this.flights = [];
  this.noFlightsMsg = '';
  this.errorMsg = '';
  this.searchForm.reset();
}


 goToBooking(flight: any) {
  this.router.navigate(
    ['/booking', flight.flightId],
    {
      state: {
        totalSeats: flight.totalSeats
      }
    }
  );
}



}
