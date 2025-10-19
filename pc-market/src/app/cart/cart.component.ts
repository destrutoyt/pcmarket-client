import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class CartComponent {
  cartItems = [
    { name: 'Gaming Mouse', seller: 'TechStore', price: 49.99, quantity: 1 },
    { name: 'Mechanical Keyboard', seller: 'KeyMasters', price: 89.99, quantity: 2 },
    { name: 'HD Monitor', seller: 'DisplayWorld', price: 199.99, quantity: 1 },
    { name: 'Gaming Mouse', seller: 'TechStore', price: 49.99, quantity: 1 },
    { name: 'Mechanical Keyboard', seller: 'KeyMasters', price: 89.99, quantity: 2 },
    { name: 'HD Monitor', seller: 'DisplayWorld', price: 199.99, quantity: 1 },
    { name: 'Gaming Mouse', seller: 'TechStore', price: 49.99, quantity: 1 },
    { name: 'Mechanical Keyboard', seller: 'KeyMasters', price: 89.99, quantity: 2 },
    { name: 'HD Monitor', seller: 'DisplayWorld', price: 199.99, quantity: 1 },
  ];

  totalPrice() {
    let total = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return total.toFixed(2);
  }

  shippingAddress = {
    fullName: 'John Doe',
    address: '123 Main St',
    city: 'New York',
    postalCode: '10001',
    country: 'USA',
  };

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
    this.cartItems = this.cartItems.filter(i => i !== item);
  }
}
