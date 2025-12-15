import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  @Output() registered = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  successMsg = '';
  errorMsg = '';

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['USER', Validators.required] 
  });

  submit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      roles: [`ROLE_${this.registerForm.value.role}`]
    };

    this.authService.register(payload).subscribe({
      next: () => {
        this.successMsg = 'Registration successful. Please login.';
        this.errorMsg = '';
        this.registerForm.reset({ role: 'USER' });

        setTimeout(() => this.registered.emit(), 1000);
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Registration failed';
        this.successMsg = '';
      }
    });
  }
}
