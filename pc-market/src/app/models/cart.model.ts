export interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}
export interface Cart {
  userId: number;
  items: CartItem[];
  totalPrice: number;
}