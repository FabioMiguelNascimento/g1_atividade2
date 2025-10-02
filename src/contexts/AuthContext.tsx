'use client';

import authService from '@/services/auth.service';
import { UpdateProfileData, updateProfile as updateUserProfile } from '@/services/user.service';
import { LoginRequest, RegisterRequest, User } from '@/types/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { token, user: userData } = authService.getAuthData();
      
      if (token && userData) {
        const isValid = await authService.validateToken();
        if (isValid) {
          setUser(userData);
        } else {
          authService.clearAuthData();
        }
      }
    } catch (error) {
      console.error('Erro ao verificar status de autenticação:', error);
      authService.clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const loginResponse = await authService.login(credentials);
      
      const { token, ...userData } = loginResponse;
      
      authService.saveAuthData(token, userData);
      
      setUser(userData);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true);
      await authService.register(userData);
      
      await login({
        email: userData.email,
        password: userData.password
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.clearAuthData();
    setUser(null);
  };

  const updateProfile = async (data: UpdateProfileData) => {
    if (!user) throw new Error('Usuário não autenticado');
    
    try {
      setIsLoading(true);
      const updatedUser = await updateUserProfile(user.id, data);
      
      setUser(updatedUser);
      authService.saveAuthData(authService.getAuthData().token!, updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export default AuthContext;