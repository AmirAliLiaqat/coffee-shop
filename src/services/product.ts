import api from "./api";

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
  available: boolean;
  preparationTime?: number;
  calories?: number;
  ingredients?: string;
  dietaryInfo: string[];
  allergens: string[];
  dataAiHint?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
  available?: boolean;
  preparationTime?: number;
  calories?: number;
  ingredients?: string;
  dietaryInfo?: string[];
  allergens?: string[];
  dataAiHint?: string;
}

export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },

  // Get a single product
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Create a new product
  createProduct: async (productData: CreateProductData): Promise<Product> => {
    const response = await api.post<Product>("/products", productData);
    return response.data;
  },

  // Update a product
  updateProduct: async (
    id: string,
    productData: Partial<CreateProductData>
  ): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, productData);
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // Toggle product availability
  toggleAvailability: async (id: string): Promise<Product> => {
    const response = await api.patch<Product>(
      `/products/${id}/toggle-availability`
    );
    return response.data;
  },
};
