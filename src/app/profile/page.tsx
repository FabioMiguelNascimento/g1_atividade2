'use client';

import { EditProfileDialog } from '@/components/EditProfileDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthContext } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { formatDate } from '@/lib/formatters';
import { Calendar, Mail, Settings, Shield, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuthContext();
  const { isAdmin } = usePermissions();
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Perfil do Usuário</h1>
          <p className="text-gray-600">Visualize e gerencie suas informações pessoais</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Informações Pessoais
            </CardTitle>
            <CardDescription>
              Suas informações básicas de perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center space-x-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p className="text-base">{user.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Tipo de Usuário</p>
                  <p className="text-base">
                    {isAdmin ? 'Administrador' : 'Usuário'}
                    {isAdmin && <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Admin</span>}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Membro desde</p>
                  <p className="text-base">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Ações do Perfil
            </CardTitle>
            <CardDescription>
              Gerencie sua conta e preferências
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setIsEditDialogOpen(true)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>

        <EditProfileDialog 
          open={isEditDialogOpen} 
          onOpenChange={setIsEditDialogOpen} 
        />
      </div>
    </div>
  );
}
