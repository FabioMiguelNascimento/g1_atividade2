export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity?: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string | null;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  quantity?: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
