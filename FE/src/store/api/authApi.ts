import { baseApi } from './baseApi';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User', 'Auth'],
    }),
    getMe: builder.query<{ success: boolean; data: { user: import('@/types/auth.types').User } }, void>({
      query: () => '/api/v1/auth/me',
      providesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

