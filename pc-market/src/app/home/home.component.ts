import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { Router } from "@angular/router";
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  // Base signals from service
  products = this.productService.products;
  loading = this.productService.loading;

  ngOnInit(): void {
    this.productService.fetchProducts();
  }
  viewProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
  addToCart(product: Product): void {
    console.log('Adding to cart:', product);
  }
}
