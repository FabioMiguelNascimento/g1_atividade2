'use client';

import { useAuthContext } from '@/contexts/AuthContext';
import { useMemo } from 'react';

export function usePermissions() {
  const { user, isAuthenticated } = useAuthContext();

  const permissions = useMemo(() => {
    if (!isAuthenticated || !user) {
      return {
        isAdmin: false,
        canCreateProduct: false,
        canEditProduct: false,
        canDeleteProduct: false,
        canViewUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
      };
    }

    const isAdmin = user.role === 'ADMIN';
    const isUser = user.role === 'USER';

    return {
      isAdmin,
      isUser,
      canCreateProduct: isAdmin,
      canEditProduct: isAdmin,
      canDeleteProduct: isAdmin,
      canViewProducts: true,
      
      canViewUsers: isAdmin,
      canDeleteUsers: isAdmin,
      
      canAccessAdmin: isAdmin,
    };
  }, [user, isAuthenticated]);

  return permissions;
}

export function useIsAdmin() {
  const { user, isAuthenticated } = useAuthContext();
  
  return useMemo(() => {
    return isAuthenticated && user?.role === 'ADMIN';
  }, [user, isAuthenticated]);
}
