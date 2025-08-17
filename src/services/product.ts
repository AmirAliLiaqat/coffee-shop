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
  dataAiHint?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: File;
  available?: boolean;
  preparationTime?: number;
  calories?: number;
  ingredients?: string;
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
    const formData = new FormData();

    // Add all text fields
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    formData.append("price", productData.price.toString());
    if (productData.description)
      formData.append("description", productData.description);
    if (productData.available !== undefined)
      formData.append("available", productData.available.toString());
    if (productData.preparationTime)
      formData.append(
        "preparationTime",
        productData.preparationTime.toString()
      );
    if (productData.calories)
      formData.append("calories", productData.calories.toString());
    if (productData.ingredients)
      formData.append("ingredients", productData.ingredients);
    if (productData.dataAiHint)
      formData.append("dataAiHint", productData.dataAiHint);

    // Add image file if present
    if (productData.image) {
      formData.append("image", productData.image);
    }

    const response = await api.post<Product>("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update a product
  updateProduct: async (
    id: string,
    productData: Partial<CreateProductData>
  ): Promise<Product> => {
    const formData = new FormData();

    // Add all text fields
    if (productData.name) formData.append("name", productData.name);
    if (productData.category) formData.append("category", productData.category);
    if (productData.price)
      formData.append("price", productData.price.toString());
    if (productData.description)
      formData.append("description", productData.description);
    if (productData.available !== undefined)
      formData.append("available", productData.available.toString());
    if (productData.preparationTime)
      formData.append(
        "preparationTime",
        productData.preparationTime.toString()
      );
    if (productData.calories)
      formData.append("calories", productData.calories.toString());
    if (productData.ingredients)
      formData.append("ingredients", productData.ingredients);
    if (productData.dataAiHint)
      formData.append("dataAiHint", productData.dataAiHint);

    // Add image file if present
    if (productData.image) {
      formData.append("image", productData.image);
    }

    const response = await api.put<Product>(`/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
