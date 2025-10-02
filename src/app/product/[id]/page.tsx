'use client';

import DeleteProductDialog from '@/components/admin/DeleteProductDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthContext } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { useProduct, useProductActions } from '@/hooks/useProducts';
import { formatDateTime, formatPrice } from '@/lib/formatters';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
  const { canEditProduct, canDeleteProduct } = usePermissions();
  const { deleteProduct } = useProductActions();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { product, isLoading, error } = useProduct(Number(productId));

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      if (error.includes('não encontrado') || error.includes('404')) {
        router.push('/');
      }
    }
  }, [error, router]);

  const handleGoBack = () => {
    router.push('/');
  };

  const handleEdit = () => {
    toast.info('Funcionalidade de edição em desenvolvimento');
  };

  const handleDeleteConfirm = async () => {
    if (!product) return;
    
    try {
      setIsDeleting(true);
      await deleteProduct(product.id);
      toast.success('Produto deletado com sucesso!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao deletar produto');
    } finally {
      setIsDeleting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="text-center py-8">
              <p>Produto não encontrado.</p>
              <Button onClick={handleGoBack} className="mt-4">
                Voltar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Detalhes do Produto</h1>
            <p className="text-gray-600">ID: {product.id}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl">{product.name}</CardTitle>
                <CardDescription className="text-lg mt-2">
                  Quantidade em estoque: {product.quantity || 0}
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-green-600">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'Nenhuma descrição disponível'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
              <div>
                <h4 className="font-semibold mb-2">Informações do Produto</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>ID:</strong> {product.id}</p>
                  <p><strong>Nome:</strong> {product.name}</p>
                  <p><strong>Quantidade:</strong> {product.quantity || 0}</p>
                  <p><strong>Preço:</strong> {formatPrice(product.price)}</p>
                  <p><strong>Criado por:</strong> {product.createdBy}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Datas</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Criado em:</strong> {formatDateTime(product.createdAt)}</p>
                  <p><strong>Atualizado em:</strong> {formatDateTime(product.updatedAt)}</p>
                </div>
              </div>
            </div>

            {(canEditProduct || canDeleteProduct) && (
              <div className="flex gap-4 pt-6 border-t">
                {canEditProduct && (
                  <Button 
                    className="flex-1"
                    onClick={handleEdit}
                  >
                    Editar Produto
                  </Button>
                )}
                
                {canDeleteProduct && (
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Excluir
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {product && (
        <DeleteProductDialog
          product={product}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDeleteConfirm}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}
