'use client';

import ProductList from '@/components/ProductList';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductList />
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Carregando...</p>
    </div>
  );
}
