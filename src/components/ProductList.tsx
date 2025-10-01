'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { useProductActions, useProducts } from '@/hooks/useProducts';
import { useState } from 'react';
import { toast } from 'sonner';
import ProductCard from './ProductCard';

export default function ProductList() {
  const { products, isLoading, error, refetch } = useProducts();
  const { deleteProduct, isLoading: isDeleting } = useProductActions();
  const { canCreateProduct } = usePermissions();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  if (error) {
    toast.error(error);
  }

  const handleEdit = (productId: number) => {
    toast.info(`Editar produto ${productId} - Em desenvolvimento`);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) {
      return;
    }

    try {
      setDeletingId(productId);
      await deleteProduct(productId);
      toast.success('Produto deletado com sucesso!');
      refetch();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao deletar produto');
    } finally {
      setDeletingId(null);
    }
  };

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
            <Button className="w-full">
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
          <Button>
            Novo Produto
          </Button>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
            onEdit={() => handleEdit(product.id)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
