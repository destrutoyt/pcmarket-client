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

  // Signals
  message = signal<string | null>(null);
  isEditingSignal = signal<boolean>(false);

  originalUser = signal<User | null>(null);
  editableUser = signal<User | null>(null);

  // Computed signal — detects if any profile field changed
  isChanged = computed(() => {
    const orig = this.originalUser();
    const edit = this.editableUser();
    if (!orig || !edit) return false;

    return (
      orig.first_name !== edit.first_name ||
      orig.last_name !== edit.last_name ||
      orig.address_1 !== edit.address_1 ||
      orig.address_2 !== edit.address_2 ||
      orig.state_code !== edit.state_code ||
      orig.zip_code !== edit.zip_code ||
      orig.country_code !== edit.country_code
    );
  });

  constructor() {
    this.loadUserData();
  }

  /** Load user profile data */
  private loadUserData(): void {
    const userId = this.userService.getUserId()?.toString();
    if (!userId) {
      this.message.set('No user ID found.');
      return;
    }

    this.userService.getSelectedUser(userId).subscribe({
      next: (user: User) => {
        this.originalUser.set(user);
        this.editableUser.set({ ...user }); // clone for editing
      },
      error: () => this.message.set('Unable to load user data.'),
    });
  }

  /** Update user profile */
  updateUser(): void {
    const updated = this.editableUser();
    if (!updated) return;
    console.warn('Updating user:', updated);
    this.userService.patchUser(updated.id, updated).subscribe({
      next: () => {
        this.originalUser.set({ ...updated });
        this.message.set('Profile updated successfully.');
        this.isEditingSignal.set(false);
      },
      error: () => this.message.set('Failed to update user.'),
    });
  }

  /** Update a single field reactively */
  updateField<K extends keyof User>(key: K, value: User[K]): void {
    const current = this.editableUser();
    if (!current) return;
    this.editableUser.set({ ...current, [key]: value });
  }

  /** Navigate to Orders page */
  goToOrders(): void {
    this.router.navigate(['/orders']);
  }

  /** Delete user account */
  deleteAccount(): void {
    const user = this.originalUser();
    if (!user) return;

    const confirmDelete = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.userService.logout();
        this.router.navigate(['/register']);
      },
      error: () => this.message.set('Failed to delete account. Please try again later.'),
    });
  }

  /** Returns true if currently editing */
  isEditing(): boolean {
    return this.isEditingSignal();
  }

  /** Toggle edit mode */
  toggleEdit(): void {
    const currentlyEditing = this.isEditingSignal();

    if (currentlyEditing) {
      // Cancel editing → revert to original user
      const original = this.originalUser();
      if (original) {
        this.editableUser.set({ ...original });
      }
    }

    this.isEditingSignal.set(!currentlyEditing);
  }
}
