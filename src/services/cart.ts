import api from "./api";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export const cartService = {
  getCart: async () => {
    const response = await api.get<Cart>("/cart");
    return response.data;
  },

  addToCart: async (productId: string, quantity: number) => {
    const response = await api.post<CartItem>("/cart", { productId, quantity });
    return response.data;
  },

  updateCartItem: async (productId: string, quantity: number) => {
    const response = await api.put<CartItem>(`/cart/${productId}`, {
      quantity,
    });
    return response.data;
  },

  removeFromCart: async (productId: string) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await api.delete("/cart");
    return response.data;
  },
};
