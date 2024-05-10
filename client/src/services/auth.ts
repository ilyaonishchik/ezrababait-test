import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/User';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}/auth/`, credentials: 'include' }),
  endpoints: (builder) => ({
    getMe: builder.query<User, unknown>({
      query: () => 'me',
    }),
  }),
});

export const { useGetMeQuery } = authApi;
