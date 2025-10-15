import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrdersService);

  // Base signals from service
  orders = this.orderService.orders;
  loading = this.orderService.loading;

  ngOnInit(): void {
    this.orderService.fetchOrders();
  }
}