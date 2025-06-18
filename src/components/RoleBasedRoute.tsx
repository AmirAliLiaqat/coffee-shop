'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@/components/ui/loader';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  restrictedPaths?: string[];
}

export const RoleBasedRoute = ({ children, allowedRoles, restrictedPaths = [] }: RoleBasedRouteProps) => {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!loading) {
        if (!isAuthenticated) {
          router.push('/signin');
          return;
        }

        // Check if user's role is allowed
        if (!user || !allowedRoles.includes(user.role)) {
          router.push('/userDashboard');
          return;
        }

        // Check if current path is restricted for staff
        if (user.role === 'staff' && restrictedPaths.length > 0) {
          const currentPath = window.location.pathname;
          if (restrictedPaths.some(path => currentPath.startsWith(path))) {
            router.push('/orders');
            return;
          }
        }

        setIsLoading(false);
      }
    };

    checkAccess();
  }, [isAuthenticated, loading, router, user, allowedRoles, restrictedPaths]);

  if (loading || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader size="lg" variant="primary" />
      </div>
    );
  }

  return isAuthenticated && user && allowedRoles.includes(user.role) ? <>{children}</> : null;
}; 