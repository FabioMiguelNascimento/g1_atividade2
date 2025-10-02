'use client';

import productService from '@/services/product.service';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const productList = await productService.getAllProducts();
      setProducts(productList);
    } catch (err: any) {
      console.error('Erro ao carregar produtos:', err);
      const errorMessage = err.response?.data?.message || 'Erro ao carregar produtos';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id: number) => {
    try {
      await productService.deleteProduct(id);
      await loadProducts();
    } catch (err: any) {
      console.error('Erro ao deletar produto:', err);
      throw err;
    }
  };

  return {
    products,
    isLoading,
    error,
    refetch: loadProducts,
    deleteProduct
  };
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const productData = await productService.getProductById(id);
      setProduct(productData);
    } catch (err: any) {
      console.error('Erro ao carregar produto:', err);
      const errorMessage = err.response?.data?.message || 'Erro ao carregar produto';
      setError(errorMessage);
      
      if (err.response?.status === 404) {
        setProduct(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  return {
    product,
    isLoading,
    error,
    refetch: loadProduct
  };
}

export function useProductActions() {
  const [isLoading, setIsLoading] = useState(false);

  const createProduct = async (productData: any) => {
    setIsLoading(true);
    try {
      const newProduct = await productService.createProduct(productData);
      return newProduct;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: number, productData: any) => {
    setIsLoading(true);
    try {
      const updatedProduct = await productService.updateProduct(id, productData);
      return updatedProduct;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: number) => {
    setIsLoading(true);
    try {
      await productService.deleteProduct(id);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct
  };
}
