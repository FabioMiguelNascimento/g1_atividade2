import api from '@/lib/api';
import { ApiResponse, CreateProductRequest, Product, UpdateProductRequest } from '@/types/product';

class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get<ApiResponse<Product[]>>('/products');
    return response.data.data;
  }

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data.data;
  }

  async createProduct(productData: CreateProductRequest): Promise<Product> {
    const response = await api.post<ApiResponse<Product>>('/products', productData);
    return response.data.data;
  }

  async updateProduct(id: number, productData: UpdateProductRequest): Promise<Product> {
    const response = await api.put<ApiResponse<Product>>(`/products/${id}`, productData);
    return response.data.data;
  }

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  }
}

export const productService = new ProductService();
export default productService;
