import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css']
})
export class ChangePassword {

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  successMsg = '';
  errorMsg = '';
  loading = false;

  passwordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)
      ]
    ],
    confirmPassword: ['', Validators.required]
  });

  submit(): void {
    this.successMsg = '';
    this.errorMsg = '';
    if (this.loading) return;

    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      this.errorMsg = 'Please fill all fields correctly.';
      return;
    }

    const { oldPassword, newPassword, confirmPassword } =
      this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.errorMsg = 'New password and confirm password do not match.';
      return;
    }

    this.loading = true;

    this.http.post(
      `${environment.API_BASE_URL}/api/auth/change-password`,
      { oldPassword, newPassword, confirmPassword }
    ).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Password changed successfully!';
        this.passwordForm.reset();

        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 3000);
      },
      error: (err) => {
        this.loading = false;

        if (err.status === 403) {
        this.errorMsg = 'Current password is incorrect.';
      } else if (err.status === 401) {
        this.errorMsg = 'Session expired. Please login again.';
      } else {
        this.errorMsg = 'Something went wrong. Please try again.';
      }
      }
    });
  }
}
