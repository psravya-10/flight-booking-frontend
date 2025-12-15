import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(
      `${this.baseUrl}/api/auth/register`,
      data
    );
  }
  login(data: any) {
  return this.http.post(
    `${this.baseUrl}/api/auth/login`,
    data
  );
}

}
