import api from '@/lib/api';
import { ApiResponse, CreateProductRequest, Product, UpdateProductRequest } from '@/types/product';

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>('/product');
    return response.data.data;
  }

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/product/${id}`);
    return response.data.data;
  }

  async createProduct(productData: CreateProductRequest): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>('/product', productData);
    return response.data.data;
  }

  async updateProduct(id: number, productData: UpdateProductRequest): Promise<Product> {
    const response = await api.put<ApiResponse<Product>>(`/product/${id}`, productData);
    return response.data.data;
  }

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/product/${id}`);
  }
}

// Exportar uma instância singleton
export const productService = new ProductService();
export default productService;
