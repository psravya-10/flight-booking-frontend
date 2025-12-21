import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  email = '';
  ngOnInit() {
    const email = localStorage.getItem('email');

    if (!email) {
      this.router.navigate(['/login']);
      return;
    }
    this.email = email;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
