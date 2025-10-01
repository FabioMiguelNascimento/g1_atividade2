'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/usePermissions';
import { formatDate, formatPrice } from '@/lib/formatters';
import { Product } from '@/types/product';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const { canEditProduct, canDeleteProduct } = usePermissions();
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              Quantidade: {product.quantity || 0}
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {product.description || 'Sem descrição disponível'}
        </p>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>ID: {product.id}</span>
          <span>Criado em: {formatDate(product.createdAt)}</span>
        </div>
        
        <div className="flex gap-2">
          <Link href={`/product/${product.id}`} className="flex-1">
            <Button variant="default" className="w-full">
              Ver Detalhes
            </Button>
          </Link>
          
          {canEditProduct && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onEdit}
            >
              Editar
            </Button>
          )}
          
          {canDeleteProduct && (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={onDelete}
            >
              Deletar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
