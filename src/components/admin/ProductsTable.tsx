'use client';

import EditProductDialog from '@/components/EditProductDialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useProductActions, useProducts } from '@/hooks/useProducts';
import { formatDate, formatPrice } from '@/lib/formatters';
import { EditProductFormData } from '@/schemas/product.schema';
import { Product } from '@/types/product';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import DeleteProductDialog from './DeleteProductDialog';

export default function ProductsTable() {
  const { products, isLoading, refetch } = useProducts();
  const { updateProduct, deleteProduct } = useProductActions();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setEditDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      setIsDeletingProduct(true);
      await deleteProduct(productToDelete.id);
      toast.success('Produto deletado com sucesso');
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      refetch();
    } catch (error: any) {
      toast.error('Erro ao deletar produto');
    } finally {
      setIsDeletingProduct(false);
    }
  };

  const handleSaveEdit = async (data: EditProductFormData) => {
    if (!productToEdit) return;

    try {
      setIsUpdatingProduct(true);
      await updateProduct(productToEdit.id, data);
      toast.success('Produto atualizado com sucesso!');
      setEditDialogOpen(false);
      setProductToEdit(null);
      refetch();
    } catch (error: any) {
      console.error('Erro ao atualizar produto:', error);
      toast.error(error.response?.data?.message || 'Erro ao atualizar produto');
    } finally {
      setIsUpdatingProduct(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell className="max-w-xs truncate">
              {product.description}
            </TableCell>
            <TableCell>
              {formatPrice(product.price)}
            </TableCell>
            <TableCell>{formatDate(product.createdAt)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditClick(product)}
                  disabled={isUpdatingProduct}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteClick(product)}
                  disabled={isDeletingProduct}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      </Table>
      
      <DeleteProductDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        product={productToDelete}
        onConfirm={handleConfirmDelete}
        isLoading={isDeletingProduct}
      />
      
      <EditProductDialog
        product={productToEdit}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveEdit}
        isLoading={isUpdatingProduct}
      />
    </>
  );
}
