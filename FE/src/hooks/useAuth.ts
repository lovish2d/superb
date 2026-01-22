import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCredentials, logout } from '@/store/slices/authSlice';
import { authApi } from '@/store/api/authApi';
import type { User } from '@/types/auth.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  // Try to fetch user profile if we have a token but no user data (page refresh)
  const token = sessionStorage.getItem('accessToken');
  const skipQuery = !token || !!user;

  const { data: userData, error, isSuccess } = authApi.useGetMeQuery(undefined, {
    skip: skipQuery,
  });

  useEffect(() => {
    if (isSuccess && userData?.data?.user) {
      dispatch(setCredentials({ user: userData.data.user }));
    } else if (error) {
      // If cached token is invalid, clear it
      dispatch(logout());
    }
  }, [isSuccess, userData, error, dispatch]);

  const setUser = (user: User | null) => {
    if (user) {
      dispatch(setCredentials({ user }));
    } else {
      dispatch(logout());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated: !!user || (!!token && !error), // Optimistic check while loading
    isLoading: isLoading && !!token && !user, // Only loading if we have token but not user
    setUser,
    logout: handleLogout,
  };
};
