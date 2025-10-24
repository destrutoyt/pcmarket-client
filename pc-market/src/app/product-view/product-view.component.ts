import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product = this.productService.selectedProduct;
  loading = this.productService.loading;
  error = this.productService.error;

  ngOnInit(): void {
    // Get product ID from route and fetch it
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.fetchProductById(id);
    }
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
