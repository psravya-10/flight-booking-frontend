import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  getHistory(email: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/booking/history/${email}`
    );
  }

  cancelBooking(pnr: string) {
    return this.http.delete(
      `${this.baseUrl}/api/booking/cancel/${pnr}`
    );
  }
}
