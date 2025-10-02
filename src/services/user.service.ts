import api from '@/lib/api';

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const updateProfile = async (userId: number, data: UpdateProfileData): Promise<User> => {
  try {
    const response = await api.patch(`/users/${userId}`, data);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil');
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get('/auth/me');
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar usuário atual');
  }
};
