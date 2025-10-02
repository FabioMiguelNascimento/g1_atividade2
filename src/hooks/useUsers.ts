import api from '@/lib/api';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UseUsersReturn {
  users: User[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number, data: Partial<User>) => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/users');
      setUsers(response.data.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao carregar usuários';
      setError(errorMessage);
      console.error('Erro ao buscar usuários:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      toast.success('Usuário deletado com sucesso');
      await fetchUsers();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao deletar usuário';
      toast.error(errorMessage);
      console.error('Erro ao deletar usuário:', err);
      throw err;
    }
  }, [fetchUsers]);

  const updateUser = useCallback(async (id: number, data: Partial<User>) => {
    try {
      const response = await api.patch(`/users/${id}`, data);
      toast.success('Usuário atualizado com sucesso');
      await fetchUsers();
      return response.data.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao atualizar usuário';
      toast.error(errorMessage);
      console.error('Erro ao atualizar usuário:', err);
      throw err;
    }
  }, [fetchUsers]);

  const refetch = useCallback(async () => {
    await fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    isLoading,
    error,
    refetch,
    deleteUser,
    updateUser
  };
}
