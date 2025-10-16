import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  // Signals to hold user data
  selectedUser = signal<User | null>(null);
  message = signal<string | null>(null);
  isEditingSignal = signal<boolean>(false);

  originalUser = signal<User | null>(null);
  editableUser = signal<User | null>(null);

  // Computed signal to track if any editable field changed
  isChanged = computed(() => {
    const orig = this.originalUser();
    const edit = this.editableUser();
    if (!orig || !edit) return false;

    return (
      orig.firstName !== edit.firstName ||
      orig.lastName !== edit.lastName ||
      orig.address1 !== edit.address1 ||
      orig.address2 !== edit.address2 ||
      orig.stateCode !== edit.stateCode ||
      orig.zipCode !== edit.zipCode ||
      orig.countryCode !== edit.countryCode
    );
  });

  constructor() {
    this.loadUserData();
  }

  private loadUserData() {
    const userId = this.userService.getUserId()?.toString() || '';
    this.userService.getSelectedUser(userId).subscribe({
      next: (data: any) => {
        const user: User = {
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
        };
        this.originalUser.set(user);
        this.editableUser.set({ ...user });
      },
      error: () => this.message.set('Unable to load user data.'),
    });
  }
  updateUser() {
    const updated = this.editableUser();
    if (!updated) return;

    this.userService.updateUser(updated.id!, updated).subscribe({
      next: () => {
        this.originalUser.set({ ...updated });
        this.message.set('Profile updated successfully.');
        this.isEditingSignal.set(false);
      },
      error: () => this.message.set('Failed to update user.'),
    });
  }
  updateField<K extends keyof User>(key: K, value: User[K]) {
    const current = this.editableUser();
    if (!current) return;
    this.editableUser.set({ ...current, [key]: value });
  }
  goToOrders() {
    this.router.navigate(['/orders']);
  }

  deleteAccount() {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.'))
      return;

    this.userService.deleteUser(this.selectedUser()?.id || 0).subscribe({
      next: () => {
        this.userService.logout();
        this.router.navigate(['/register']);
      },
      error: () => this.message.set('Failed to delete account. Please try again later.'),
    });
  }

  // Method to check if editing mode is active
  isEditing() {
    return this.isEditingSignal();
  }

  // Method to toggle editing mode
  toggleEdit() {
    const currentlyEditing = this.isEditingSignal();

    if (currentlyEditing) {
      // Cancel editing — revert changes
      const original = this.originalUser();
      if (original) {
        this.editableUser.set({ ...original });
      }
    }

    // Flip the editing state
    this.isEditingSignal.set(!currentlyEditing);
  }
}
