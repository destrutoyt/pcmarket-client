import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

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
    console.log('Adding to cart:', product);
  }
}
