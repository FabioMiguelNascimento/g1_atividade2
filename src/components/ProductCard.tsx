'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, formatPrice } from '@/lib/formatters';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer hover:scale-[1.02] transition-transform" 
      onClick={handleCardClick}
    >
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
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>ID: {product.id}</span>
          <span>Criado em: {formatDate(product.createdAt)}</span>
        </div>
        
        <div className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
          Clique para ver detalhes →
        </div>
      </CardContent>
    </Card>
  );
}
