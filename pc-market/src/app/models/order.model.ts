export interface OrderItem {
  productName: string;
  sellerName: string;
  price: number;
  quantity: number;
  status: string;
}

export interface Orders {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  orderItems: OrderItem[];
}
