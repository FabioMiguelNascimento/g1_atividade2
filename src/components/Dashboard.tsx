'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthContext } from '@/contexts/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { usePermissions } from '@/hooks/usePermissions';
import { formatDate } from '@/lib/formatters';
import ProductList from './ProductList';

export default function Dashboard() {
  const { user } = useAuthContext();
  const { logout } = useAuth();
  const { isAdmin, canCreateProduct, canAccessAdmin } = usePermissions();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={logout} variant="outline">
            Sair
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo!</CardTitle>
              <CardDescription>
                Informações da sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Nome:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Tipo:</strong> {isAdmin ? 'Administrador' : 'Usuário'}</p>
                <p><strong>Membro desde:</strong> {formatDate(user.createdAt)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Funcionalidades disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {canCreateProduct && (
                  <Button className="w-full" variant="outline">
                    Novo Produto
                  </Button>
                )}
                
                {canAccessAdmin && (
                  <Button className="w-full" variant="outline">
                    Relatórios
                  </Button>
                )}
                
                <Button className="w-full" variant="outline">
                  Configurações
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status do Sistema</CardTitle>
              <CardDescription>
                Informações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><span className="text-green-500">●</span> Sistema Online</p>
                <p><span className="text-green-500">●</span> API Conectada</p>
                <p><span className="text-green-500">●</span> Autenticado</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <ProductList />
        </div>
      </div>
    </div>
  );
}