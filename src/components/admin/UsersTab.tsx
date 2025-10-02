'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthContext } from '@/contexts/AuthContext';
import UsersTable from './UsersTable';

export default function UsersTab() {
  const { user } = useAuthContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Usuários</CardTitle>
        <CardDescription>
          Lista de todos os usuários cadastrados no sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UsersTable currentUserId={user?.id} />
      </CardContent>
    </Card>
  );
}
