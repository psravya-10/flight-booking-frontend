import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Login } from '../../auth/login/login';
import { Register } from '../../auth/register/register';
import { Search } from '../../flight/search/search';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Login,
    Register,
    Search
  ],
  templateUrl: './home.html'
})
export class HomeComponent {
  activeView: 'home' | 'login' | 'register' | 'search' = 'home';

  showLogin() {
    this.activeView = 'login';
  }

  showRegister() {
    this.activeView = 'register';
  }

  showSearch() {
    this.activeView = 'search';
  }
}
