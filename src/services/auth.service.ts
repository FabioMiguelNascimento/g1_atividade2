'use client';

import api from '@/lib/api';
import { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '@/types/auth';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    return response.data.data;
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<ApiResponse<RegisterResponse>>('/auth/register', userData);
    return response.data.data;
  }

  async getMe(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  }

  saveAuthData(token: string, user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getAuthData(): { token: string | null; user: User | null } {
    if (typeof window === 'undefined') {
      return { token: null, user: null };
    }
    
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    return { token, user };
  }

  clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  async validateToken(): Promise<boolean> {
    try {
      const { token } = this.getAuthData();
      if (!token) return false;
      
      await this.getMe();
      return true;
    } catch {
      this.clearAuthData();
      return false;
    }
  }

  isAuthenticated(): boolean {
    const { token } = this.getAuthData();
    return !!token;
  }
}

export const authService = new AuthService();
export default authService;
