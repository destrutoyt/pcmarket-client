import { Component, inject, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { RouterLink } from '@angular/router';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  imports: [RouterLink, FormsModule],
})
export class CartComponent {
  private userService = inject(UserService);

  shippingAddress = signal({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    zipCode: '',
    country: '',
  });

  ngOnInit() {
    const cachedUser = this.userService.user();

    if (cachedUser) {
      this.setShippingFromUser(cachedUser);
    } else {
      console.warn('No cached user, fetching from API...');
      const id = this.userService.getUserId();

      if (!id) return;

      this.userService.getSelectedUser(id.toString()).subscribe({
        next: (user) => this.setShippingFromUser(user),
        error: () => console.warn('Could not load user for shipping'),
      });
    }
  }

  private setShippingFromUser(user: User) {
    this.shippingAddress.set({
      fullName: `${user.firstName} ${user.lastName}`,
      addressLine1: user.address1,
      addressLine2: user.address2 || '',
      state: user.stateCode,
      zipCode: user.zipCode,
      country: user.countryCode,
    });
  }

  cartItems = [
    { name: 'Gaming Mouse', seller: 'TechStore', price: 49.99, quantity: 1 },
    { name: 'Mechanical Keyboard', seller: 'KeyMasters', price: 89.99, quantity: 2 },
    { name: 'HD Monitor', seller: 'DisplayWorld', price: 199.99, quantity: 1 },
  ];

  totalPrice() {
    let total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return total.toFixed(2);
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

  submitOrder() {
    console.log('Order submitted!');
  }

  removeItem(item: any) {
    console.log(`Removing item: ${item.name}`);
    this.cartItems = this.cartItems.filter((i) => i !== item);
  }
}
