import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, Observable, of, tap } from 'rxjs';

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

  // == Signals for login state ==
  private _isLoggedIn = signal(false);
  private _username = signal<string | null>(null);
  private _id = signal<number | null>(null);

  // **Added this signal to store full user data**
  private _user = signal<User | null>(null);

  // == Public readonly signals ==
  users = computed(() => this._users());
  selectedUser = computed(() => this._selectedUser());
  loading = computed(() => this._loading());
  error = computed(() => this._error());
  user = computed(() => this._user()); // Added computed signal for full user

  // Login state
  isLoggedIn = computed(() => !!this._isLoggedIn());
  username = computed(() => this._username());

  constructor() {
    const token = this.getToken();
    const username = this.getUsername();
    if (token && username) {
      Promise.resolve().then(() => {
        this._isLoggedIn.set(true);
        this._username.set(username);
        // Automatically restore user ID if stored
        const userId = localStorage.getItem('userId');
        if (userId) this._id.set(Number(userId));
      });
    }
  }

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
  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  /* Login method */
  login(username: string, password: string) {
    this._loading.set(true);
    this._error.set(null);

    this.http
      .post<{ token: string; userId: number }>(`${this.apiUrl}/login`, { username, password })
      .subscribe({
        next: (res) => {
          if (res && res.token) {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('jwtToken', res.token);
              localStorage.setItem('username', username); // store as plain string
              localStorage.setItem('userId', res.userId.toString()); // store user ID as string

              // update signals
              this._isLoggedIn.set(true);
              this._username.set(username);
              this._id.set(res.userId);
            }
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

  /* Logout safely */
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    }
    this._selectedUser.set(null);
    this._isLoggedIn.set(false);
    this._username.set(null);
    this._user.set(null); // Clear stored user
    this._id.set(null);
  }

  /* Get token safely */
  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  /* Get username safely */
  getUsername(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('username');
    }
    return null;
  }

  getUserId(): number | null {
    return this._id();
  }

  getSelectedUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
