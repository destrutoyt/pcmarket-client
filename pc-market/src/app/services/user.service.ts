import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, of, tap } from 'rxjs';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/users';

  // === Signals ===
  private _users = signal<User[]>([]);
  private _selectedUser = signal<User | null>(null);
  private _user = signal<User | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  // === Login / Auth state ===
  private _isLoggedIn = signal(false);
  private _username = signal<string | null>(null);
  private _id = signal<number | null>(null);

  // === Computed signals (read-only to components) ===
  users = computed(() => this._users());
  selectedUser = computed(() => this._selectedUser());
  user = computed(() => this._user());
  loading = computed(() => this._loading());
  error = computed(() => this._error());
  isLoggedIn = computed(() => this._isLoggedIn());
  username = computed(() => this._username());

  constructor() {
    if (isBrowser()) {
      const token = localStorage.getItem('jwtToken');
      const username = localStorage.getItem('username');
      const userId = localStorage.getItem('userId');
      if (token && username && userId) {
        this._isLoggedIn.set(true);
        this._username.set(username);
        this._id.set(Number(userId));
      }
    }
  }

  // === CRUD Operations ===

  /** Create user */
  createUser(userData: Partial<User>) {
    this._loading.set(true);
    this._error.set(null);

    this.http
      .post<User>(this.apiUrl, userData)
      .pipe(
        catchError((err) => {
          console.error('[USER CREATE ERROR]', err);
          this._error.set('Failed to create user');
          this._loading.set(false);
          return of(null);
        }),
      )
      .subscribe((createdUser) => {
        if (createdUser) {
          this._users.update((prev) => [...prev, createdUser]);
          this._selectedUser.set(createdUser);
        }
        this._loading.set(false);
      });
  }

  /** Update user (PATCH) */
  patchUser(userId: number, changes: Partial<User>) {
    return this.http.patch<User>(`${this.apiUrl}/${userId}`, changes).pipe(
      tap((user) => {
        // Keep signals in sync
        this._selectedUser.set(user);
        this._user.set(user);
      }),
      catchError((err) => {
        console.error('[USER UPDATE ERROR]', err);
        return of(null as unknown as User);
      }),
    );
  }

  /** Delete user by ID */
  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /** Get single user */
  getSelectedUser(id: string) {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      tap((user) => {
        this._selectedUser.set(user);
        this._user.set(user);
      }),
    );
  }

  // === Authentication ===

  /** Login */
  login(username: string, password: string) {
    this._loading.set(true);
    this._error.set(null);

    this.http
      .post<{ token: string; userId: number }>(`${this.apiUrl}/login`, { username, password })
      .subscribe({
        next: (res) => {
          if (res && res.token) {
            // Store token and user info locally
            localStorage.setItem('jwtToken', res.token);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', res.userId.toString());

            this._isLoggedIn.set(true);
            this._username.set(username);
            this._id.set(res.userId);

            this.getSelectedUser(res.userId.toString()).subscribe({
              next: (u) => this._user.set(u),
            });
          }
          this._loading.set(false);
        },
        error: (err) => {
          this._error.set('Invalid username or password');
          this._loading.set(false);
        },
      });
  }

  /** Logout */
  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this._isLoggedIn.set(false);
    this._username.set(null);
    this._id.set(null);
    this._user.set(null);
    this._selectedUser.set(null);
  }

  // === Helpers ===

  getToken(): string | null {
    return isBrowser() ? localStorage.getItem('jwtToken') : null;
  }

  getUsername(): string | null {
    return isBrowser() ? localStorage.getItem('username') : null;
  }

  getUserId(): number | null {
    return this._id();
  }

  getCachedUser(): User | null {
    return this._selectedUser();
  }
}
