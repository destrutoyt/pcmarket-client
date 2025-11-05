import { Component, inject, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  imports: [RouterLink, FormsModule],
})
export class CartComponent {
  private userService = inject(UserService);
  private cartService = inject(CartService);
  private router = inject(Router);

  // Base signals from service
  cart = this.cartService.cart;
  loading = this.cartService.loading;

  // Signal to store user data
  user = signal<User | null>(null);

  ngOnInit() {
    const userIdStr = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const userId = userIdStr ? Number(userIdStr) : null;

    if (userId !== null) {
      this.userService.getSelectedUser(userId.toString()).subscribe({
        next: () => {
          this.user.set(this.userService.user());
        },
        error: (err) => console.error('Error fetching user data', err),
      });
      this.cartService.fetchCartItems(userId);
    }
  }

  totalPrice() {
    return (this.cart()?.totalPrice ?? 0).toFixed(2);
  }

  paymentInfo = {
    cardName: 'John Doe',
    cardNumber: '**** **** **** 1234',
    expiry: '12/26',
    cvv: '***',
  };

  message() {
    return 'Test message: cart loaded successfully';
  }

  placeOrder() {
    let userId: number | null = null;
    if (typeof window !== 'undefined') {
      const val = localStorage.getItem('userId');
      if (val) userId = Number(val);
    }

    this.cartService.checkout(userId!).subscribe({
      next: () => {
        console.log('Checkout successful');
        this.router.navigate(['/success-order']);
      },
      error: (err) => {
        console.error('Error during checkout', err);
      },
    });
  }

  removeItem(cartItemId: number) {
    console.log(`Removing item: ${cartItemId}`);

    this.cartService.deleteCartItem(cartItemId).subscribe({
      next: () => {
        console.log('Item removed successfully');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error removing item from cart', err);
      },
    });
  }
}
