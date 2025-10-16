import { catchError, of, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../models/order.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef); // 👈 auto cleanup reference

  private readonly apiUrl = 'http://localhost:8080/api/orders';

  private _orders = signal<Orders[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  orders = this._orders.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  fetchOrders() {
    this._loading.set(true);
    this._error.set(null);

    timer(1000)
      .pipe(
        switchMap(() =>
          this.http.get<Orders[]>(`${this.apiUrl}/user/${this.userService.getUserId()}`).pipe(
            catchError((err) => {
              console.error('Error fetching orders', err);
              this._error.set('Failed to load orders');
              this._loading.set(false);
              return of([]);
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((data) => {
        this._orders.set(data);
        this._loading.set(false);
      });
  }
}
