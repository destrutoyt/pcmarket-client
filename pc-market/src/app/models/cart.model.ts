export interface CartItem {
  productId: number;
  productName: string;
  productSeller: string;
  quantity: number;
  price: number;
}
export interface Cart {
  cartId: number;
  cartItems: CartItem[];
  totalPrice: number;
}