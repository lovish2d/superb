import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import type { BaseUserType } from '@/types/auth.types';

const getRedirectPath = (userType: BaseUserType | undefined): string => {
  if (!userType) {
    return '/login';
  }

  // Platform users
  if (
    userType === 'platform_owner' ||
    userType === 'platform_owner_admin' ||
    userType === 'platform_user'
  ) {
    return '/dashboard';
  }

  // Customer users
  if (userType === 'customer_admin' || userType === 'customer_user') {
    return '/customer/dashboard';
  }

  return '/dashboard';
};

type GuestGuardProps = {
  children: ReactNode;
};

/**
 * GuestGuard
 * Protects routes that should only be accessible to non-authenticated users
 * Redirects authenticated users to their appropriate dashboard
 */
const GuestGuard = ({ children }: GuestGuardProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isAuthenticated && user) {
    const redirectPath = getRedirectPath(user.userType);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default GuestGuard;

