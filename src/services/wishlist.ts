import api from "./api";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  inStock?: boolean;
}

export const wishlistService = {
  getWishlist: async () => {
    const response = await api.get<WishlistItem[]>("/wishlist");
    return response.data;
  },

  addToWishlist: async (productId: string) => {
    const response = await api.post<WishlistItem>("/wishlist", { productId });
    return response.data;
  },

  removeFromWishlist: async (productId: string) => {
    const response = await api.delete(`/wishlist/${productId}`);
    return response.data;
  },
};
