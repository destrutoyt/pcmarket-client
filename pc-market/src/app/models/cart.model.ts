export interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  imageUrl: string;
  seller: string;
  quantity: number;
  price: number;
}
export interface Cart {
  cartId: number;
  cartItems: CartItem[];
  totalPrice: number;
}