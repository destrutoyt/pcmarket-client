import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../services/product.service';
import { NgForOf } from "@angular/common";
@Component({
  selector: 'app-home',
  imports: [NgForOf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = []; // Array to hold products

  constructor(private productService: ProductService) { } // Inject ProductService

  ngOnInit(): void {
    console.log("HomeComponent initialized");
    // Fetch products on component initialization
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data; // Assign fetched products to the array
    });
  }
}
