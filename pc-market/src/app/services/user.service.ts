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
  /* Login method */
  login(username: string, password: string) {
    console.log('UserService login called', username);
    this._loading.set(true);
    this._error.set(null);

    this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).subscribe({
      next: (res) => {
        console.log('Login response', res);
        if (res && res.token) {
          localStorage.setItem('jwtToken', res.token);
          console.log('Token stored in localStorage:', res.token);
        }
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Login error', err);
        this._error.set('Invalid username or password');
        this._loading.set(false);
      },
    });
  }

  /* Optional: get token */
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  /* Optional: logout */
  logout(): void {
    localStorage.removeItem('jwtToken');
    this._selectedUser.set(null);
  }
}
