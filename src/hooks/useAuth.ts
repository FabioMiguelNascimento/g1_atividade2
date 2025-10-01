'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { LoginRequest, RegisterRequest } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const { login: contextLogin, register: contextRegister, logout: contextLogout } = useAuthContext();
  const router = useRouter();

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      await contextLogin(credentials);
      toast.success('Login realizado com sucesso!');
      router.push('/');
      return true;
    } catch (error: any) {
      console.error('Erro no login:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true);
      await contextRegister(userData);
      toast.success('Conta criada com sucesso! Você foi automaticamente logado.');
      router.push('/');
      return true;
    } catch (error: any) {
      console.error('Erro no registro:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao criar conta. Tente novamente.';
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    contextLogout();
    toast.success('Logout realizado com sucesso!');
    router.push('/login');
  };

  return {
    login,
    register,
    logout,
    isLoading
  };
}
