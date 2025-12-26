import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PasswordExpiryGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const expired = localStorage.getItem('passwordExpired') === 'true';

    if (expired) {
      this.router.navigate(['/change-password']);
      return false;
    }
    return true;
  }
}
