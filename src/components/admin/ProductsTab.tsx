'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductsTable from './ProductsTable';

export default function ProductsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Produtos</CardTitle>
        <CardDescription>
          Lista de todos os produtos cadastrados no sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ProductsTable />
      </CardContent>
    </Card>
  );
}
