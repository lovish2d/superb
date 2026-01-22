import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API configuration
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      // Get token from sessionStorage
      const token = sessionStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    'Auth',
    'User',
    'Role',
    'Permission',
    'Customer',
    'ServiceRequest',
    'Equipment',
    'Stand',
  ],
  endpoints: () => ({}),
});

export default baseApi;
