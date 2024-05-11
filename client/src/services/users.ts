import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserDetails } from '../types/UserDetails';
import { PaginatedResponse } from '../types/PaginatedResponse';
import { Deed } from '../types/Deed';

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
    getUserDeeds: builder.query<PaginatedResponse<Deed>, { userId: number; page: number; take: number }>({
      query: ({ userId, page, take }) => `${userId}/deeds?page=${page}&take=${take}`,
    }),
  }),
});

export const { useGetMyDetailsQuery, useGetUserDeedsQuery } = usersApi;
