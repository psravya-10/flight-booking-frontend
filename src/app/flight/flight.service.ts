import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private baseUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  searchFlights(payload: any) {
    return this.http.post<any[]>(
      `${this.baseUrl}/api/flight/search`,
      payload
    );
  }
bookFlight(flightId: string, payload: any) {
  return this.http.post(
    `${this.baseUrl}/api/booking/${flightId}`,
    payload
  );
}

}

