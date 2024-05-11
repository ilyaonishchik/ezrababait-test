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
  tagTypes: ['UserDetails', 'UserDeeds'],
  endpoints: (builder) => ({
    getMyDetails: builder.query<UserDetails, void>({
      query: () => 'me/details',
      providesTags: ['UserDetails'],
    }),
    getUserDeeds: builder.query<PaginatedResponse<Deed>, { userId: number; page: number; take: number }>({
      query: ({ userId, page, take }) => `${userId}/deeds?page=${page}&take=${take}`,
      providesTags: ['UserDeeds'],
    }),
    createDeed: builder.mutation<Deed, { userId: number; title: string; description: string; points: number }>({
      query: (body) => ({
        url: `${body.userId}/deeds`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserDetails', 'UserDeeds'],
    }),
    deleteDeed: builder.mutation<Deed, { userId: number; deedId: number }>({
      query: ({ userId, deedId }) => ({
        url: `${userId}/deeds/${deedId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UserDetails', 'UserDeeds'],
    }),
  }),
});

export const { useGetMyDetailsQuery, useGetUserDeedsQuery, useCreateDeedMutation, useDeleteDeedMutation } = usersApi;
