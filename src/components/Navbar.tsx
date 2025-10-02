'use client';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { Package, Plus } from 'lucide-react';
import Link from 'next/link';
import UserDropdown from './UserDropdown';

export default function Navbar() {
  const { isAuthenticated } = useAuthContext();
  const { canCreateProduct } = usePermissions();

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                ProductApp
              </span>
            </Link>
            
            {isAuthenticated && (
              <div className="hidden md:flex items-center ml-10 space-x-8">
                <Link
                  href="/"
                  className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Produtos
                </Link>
                
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <UserDropdown />
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost">
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button>
                    Criar Conta
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
