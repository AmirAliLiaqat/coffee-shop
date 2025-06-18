import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader } from '@/components/ui/loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { isAuthenticated, loading, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        if (!isAuthenticated || user?.role !== 'user') {
          router.push('/signin');
        } else {
          setIsLoading(false);
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, loading, router, user]);

  if (loading || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader size="lg" variant="primary" />
      </div>
    );
  }

  return isAuthenticated && user?.role === 'user' ? <>{children}</> : null;
};