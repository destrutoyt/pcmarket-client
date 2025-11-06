import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/products';

  // === Signals ===
  private _products = signal<Product[]>([]);
  private _selectedProduct = signal<Product | null>(null);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  // === Public readonly computed signals ===
  products = computed(() => this._products());
  selectedProduct = computed(() => this._selectedProduct());
  loading = computed(() => this._loading());
  error = computed(() => this._error());

  // === Methods ===

  /* Fetch product list */
  fetchProducts() {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<Product[]>(`${this.apiUrl}`).pipe(
      catchError((err) => {
        console.error('Error fetching products', err);
        this._error.set('Failed to load products');
        this._loading.set(false);
        return of([]);
      })
    ).subscribe((data) => {
      this._products.set(data);
      this._loading.set(false);
    });
  }

  /* Fetch single product by ID */
  fetchProductById(id: number) {
    this._loading.set(true);
    this._error.set(null);
    this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError((err) => {
        console.error('Error fetching product by ID', err);
        this._error.set('Failed to load product details');
        this._loading.set(false);
        return of(null);
      })
    ).subscribe((data) => {
      this._selectedProduct.set(data);
      this._loading.set(false);
    });
  }
}
