import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngIf/ngClass

@Component({
  selector: 'app-user-registration',
  imports: [CommonModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  // true means show the Login form (slider is on the right)
  // false means show the Registration form (slider is on the left, default)
  public showLogin = signal(false);

  // Method to toggle between forms
  toggleForm() {
    this.showLogin.update(current => !current);
  }

  // Placeholder for authentication logic
  onRegister() {
    console.log('Registration attempt.');
    // TODO: Implement registration logic with Firebase/Backend
  }

  onLogin() {
    console.log('Login attempt.');
    // TODO: Implement login logic
  }
}
