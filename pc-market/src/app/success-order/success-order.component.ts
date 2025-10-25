import { Component, OnInit, inject, signal } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success-order',
  imports: [RouterLink],
  templateUrl: './success-order.component.html',
  styleUrl: './success-order.component.css',
})
export class SuccessOrderComponent implements OnInit {
  private ordersService = inject(OrdersService);
  orderId = signal<number | null>(null);
  loading = signal(true);

  ngOnInit() {
    this.ordersService.fetchOrders();
    setTimeout(() => {
      const orders = this.ordersService.orders();
      if (orders && orders.length > 0) {
        // Get most recent order (assuming last one is newest)
        const latest = orders[orders.length - 1];
        this.orderId.set(latest.orderId);
      }
      this.loading.set(false);
    }, 3000); // 2 second loading
  }
}
