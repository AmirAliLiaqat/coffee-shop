import api from "./api";
import { CartItem } from "./cart";

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  shippingAddress: ShippingAddress;
  createdAt: string;
}

export interface CreateOrderData {
  items: CartItem[];
  shipping: ShippingAddress;
  payment: PaymentInfo;
  total: number;
}

export const orderService = {
  createOrder: async (orderData: CreateOrderData) => {
    const response = await api.post<{ orderId: string }>("/orders", orderData);
    return response.data;
  },

  getOrder: async (orderId: string) => {
    const response = await api.get<Order>(`/orders/${orderId}`);
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get<Order[]>("/orders");
    return response.data;
  },

  cancelOrder: async (orderId: string) => {
    const response = await api.post<Order>(`/orders/${orderId}/cancel`);
    return response.data;
  },
};
