import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  private router = inject(Router);

  // Base signals from service
  products = this.productService.products;
  loading = this.productService.loading;

  // variables

  ngOnInit(): void {
    this.productService.fetchProducts();
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  addToCart(product: Product): void {
    let userId: number | null = null;
    if (typeof window !== 'undefined') {
      const val = localStorage.getItem('userId');
      if (val) userId = Number(val);
    }
    if (!userId) {
      console.error('No user logged in. Cannot add to cart.');
      return;
    }
    console.log('Adding to cart:', product);
    this.cartService.addProductToCart(Number(userId), product.id, 1).subscribe({
      next: (cart) => {
        console.log('Product added to cart:', cart);
        this.showModal();
      },
      error: (err) => {
        console.error('Error adding product to cart:', err);
      },
    });
  }

  showModal(): void {
    const modal = document.getElementById('product-modal');
    if (modal) modal.style.display = 'flex';
  }
  
  closeModal(): void {
    const modal = document.getElementById('product-modal');
    if (modal) modal.style.display = 'none';
  }
}
