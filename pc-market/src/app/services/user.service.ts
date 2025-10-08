import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/users';

  // == Signals ==
  private _users = signal<User[]>([]);
  private _selectedUser = signal<User | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  // == Public readonly signals ==
  users = computed(() => this._users());
  selectedUser = computed(() => this._selectedUser());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  // == Methods ==

  /* Create a new user */
  createUser(userData: Partial<User>) {
    this._loading.set(true);
    this._error.set(null);

    this.http
      .post<User>(`${this.apiUrl}`, userData)
      .pipe(
        catchError((err) => {
          console.error('Error creating user', err);
          this._error.set('Failed to create user');
          this._loading.set(false);
          return of(null);
        }),
      )
      .subscribe((createdUser) => {
        if (createdUser) {
          console.log('User created:', createdUser);
          this._users.update((prev) => [...prev, createdUser]);
          this._selectedUser.set(createdUser);
        }
        this._loading.set(false);
      });
  }
}
