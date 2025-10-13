import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  selectedUser = signal<User | null>(null);
  message = signal<string | null>(null);

  private router = inject(Router);
  private userService = inject(UserService);

  constructor() {
    this.loadUserData();
  }

  private loadUserData() {
    const userId = this.userService.getUserId()?.toString() || '';

    this.userService.getSelectedUser(userId).subscribe({
      next: (data: any) => {
        console.log('Data loaded', data);
        setTimeout(() => {
          this.selectedUser.set({
            id: data.id,
            username: data.username,
            dob: data.dob,
            firstName: data.first_name,
            lastName: data.last_name,
            address1: data.address_1,
            address2: data.address_2,
            stateCode: data.state_code,
            zipCode: data.zip_code,
            countryCode: data.country_code,
            accountCreated: data.account_created,
          });
        }, 1000);

      },
      error: () => this.message.set('Unable to load user data.'),
    });
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  deleteAccount() {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.'))
      return;

    const user = this.selectedUser();
    if (user) console.log('Delete user', user.id);
  }
}
