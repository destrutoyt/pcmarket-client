import { Component, effect, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  standalone: true,
})
export class UserRegistrationComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  public showLogin = signal(false);
  private hasNavigated = false;

  constructor() {
    effect(() => {
      if (this.userService.isLoggedIn() && !this.hasNavigated) {
        this.hasNavigated = true;
        this.router.navigate(['/']);
      }
    });
  }

  newUser = signal({
    first_name: '',
    last_name: '',
    username: '',
    password_hash: '',
    dob: '',
    address_1: '',
    address_2: '',
    state_code: '',
    zip_code: '',
    country_code: '',
  });

  loginUser = signal({
    username: '',
    password_hash: '',
  });

  // Toggle between login and register forms
  toggleForm() {
    this.showLogin.update((current) => !current);
  }

  // Register a new user
  onRegister() {
    const userToCreate = {
      ...this.newUser(),
      account_created: new Date().toISOString(),
    };

    this.userService.createUser(userToCreate);
    console.log('Registering user:', userToCreate);
  }

  // Login existing user
  onLogin() {
    const { username, password_hash } = this.loginUser();
    this.userService.login(username, password_hash);
  }
}
