import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserDetails } from '../types/UserDetails';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/users/`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getMyDetails: builder.query<UserDetails, void>({
      query: () => 'me/details',
    }),
  }),
});

export const { useGetMyDetailsQuery } = usersApi;
