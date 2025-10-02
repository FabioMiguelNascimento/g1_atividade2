'use client';

import ProductsTab from '@/components/admin/ProductsTab';
import UsersTab from '@/components/admin/UsersTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthContext } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { Package, ShieldAlert, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function AdminPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
  const { isAdmin } = usePermissions();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (!authLoading && !isAdmin) {
      router.push('/');
      toast.error('Acesso negado. Apenas administradores podem acessar esta página.');
      return;
    }
  }, [isAuthenticated, isAdmin, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <ShieldAlert className="mr-2 h-8 w-8" />
            Painel Administrativo
          </h1>
          <p className="text-gray-600">Gerencie usuários e produtos do sistema</p>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Produtos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersTab />
          </TabsContent>

          <TabsContent value="products">
            <ProductsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
