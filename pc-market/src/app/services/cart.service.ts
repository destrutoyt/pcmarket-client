import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/cart';

  // ==== Signals ====
  private _cart = signal<Cart | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  cart = this._cart.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();

  // Methods

  fetchCartItems(userId: number) {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<Cart>(`${this.apiUrl}/${userId}`).subscribe({
      next: (data) => {
        console.log('Fetched cart items:', data);
        this._cart.set(data);
        this._loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching cart items', err);
        this._error.set('Failed to load cart items');
        this._loading.set(false);
      },
    });
  }
  
  addProductToCart(userId: number, productId: number, quantity: number) {
    return this.http.post<Cart>(`${this.apiUrl}/add`, {
      userId,
      productId,
      quantity,
    });
  }

  deleteCartItem(cartItemId: number) {
    return this.http.delete(`${this.apiUrl}/item/${cartItemId}`);
  }
}
