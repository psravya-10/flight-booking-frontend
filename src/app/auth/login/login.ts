import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  @Output() loggedIn = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  successMsg = '';
  errorMsg = '';

  loginForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required]
});

submit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const payload = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password
  };

  this.authService.login(payload).subscribe({
    next: () => {
      this.successMsg = 'Login successful';
      this.errorMsg = '';

      setTimeout(() => this.loggedIn.emit(), 800);
    },
    error: (err) => {
      this.errorMsg = err?.error?.message || 'Invalid email or password';
      this.successMsg = '';
    }
  });
}}
