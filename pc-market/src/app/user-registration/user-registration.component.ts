import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngIf/ngClass
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {

  private userService = inject(UserService);
  public showLogin = signal(false);

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
    country_code: ''
  });

  loginUser = signal({
    username: '',
    password_hash: ''
  });

  // Method to toggle between forms
  toggleForm() {
    this.showLogin.update(current => !current);
  }

  // Placeholder for authentication logic
  onRegister() {
    const userToCreate = {
      ...this.newUser(),
      account_created: new Date().toISOString()
    }

    this.userService.createUser(userToCreate);
    console.log('Registering user:', userToCreate);
  }

  onLogin() {
    console.log('Login attempt.');
    const { username, password_hash } = this.loginUser();

    this.userService.login(username, password_hash);
  }
}
