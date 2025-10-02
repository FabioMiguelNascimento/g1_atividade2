'use client';

import CreateProductDialog from '@/components/CreateProductDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { useProductActions, useProducts } from '@/hooks/useProducts';
import { CreateProductFormData } from '@/schemas/product.schema';
import { useState } from 'react';
import { toast } from 'sonner';
import ProductCard from './ProductCard';

export default function ProductList() {
  const { products, isLoading, error, refetch } = useProducts();
  const { canCreateProduct } = usePermissions();
  const { createProduct } = useProductActions();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateProduct = async (data: CreateProductFormData) => {
    try {
      setIsCreating(true);
      await createProduct(data);
      toast.success('Produto criado com sucesso!');
      setShowCreateDialog(false);
      refetch();
    } catch (error: any) {
      console.error('Erro ao criar produto:', error);
      toast.error(error.response?.data?.message || 'Erro ao criar produto');
    } finally {
      setIsCreating(false);
    }
  };

  if (error) {
    toast.error(error);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Nenhum produto encontrado</CardTitle>
          <CardDescription>
            Ainda não há produtos cadastrados no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {canCreateProduct ? (
            <Button 
              className="w-full" 
              onClick={() => setShowCreateDialog(true)}
              disabled={isCreating}
            >
              Cadastrar Primeiro Produto
            </Button>
          ) : (
            <p className="text-center text-gray-500">
              Apenas administradores podem cadastrar produtos.
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Produtos</h2>
          <p className="text-gray-600">
            {products.length} produto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
          </p>
        </div>
        {canCreateProduct && (
          <Button 
            onClick={() => setShowCreateDialog(true)}
            disabled={isCreating}
          >
            Novo Produto
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
          />
        ))}
      </div>

      <CreateProductDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSave={handleCreateProduct}
        isLoading={isCreating}
      />
    </div>
  );
}
