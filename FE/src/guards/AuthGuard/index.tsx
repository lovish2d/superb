import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type AuthGuardProps = {
  children: ReactNode;
};

/**
 * AuthGuard
 * Protects routes that require authentication
 * Redirects to login if user is not authenticated
 */
const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show loading state while checking auth
    return null;
  }

  if (!isAuthenticated) {
    // Redirect to login, preserving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;

