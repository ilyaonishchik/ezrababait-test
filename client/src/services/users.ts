import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserDetails } from '../types/UserDetails';
import { PaginatedResponse } from '../types/PaginatedResponse';
import { Deed } from '../types/Deed';
import { UpdateDeedDto } from '../types/UpdateDeedDto';
import { User } from '../types/User';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/users/`,
    credentials: 'include',
  }),
  tagTypes: ['UserDetails', 'UserDeeds'],
  endpoints: (builder) => ({
    getUsers: builder.query<
      PaginatedResponse<User>,
      { page: number; take: number; followerId?: number; followingId?: number; query?: string }
    >({
      query: ({ page, take, followerId, followingId, query }) =>
        `?page=${page}&take=${take}&followerId=${followerId}&followingId=${followingId}&query=${query}`,
    }),
    getUserDetails: builder.query<UserDetails, { userId: number }>({
      query: ({ userId }) => `${userId}/details`,
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
    updateDeed: builder.mutation<{ message: string }, { userId: number; deedId: number; body: UpdateDeedDto }>({
      query: ({ userId, deedId, body }) => ({
        url: `${userId}/deeds/${deedId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['UserDeeds', 'UserDetails'],
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

export const {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useGetUserDeedsQuery,
  useCreateDeedMutation,
  useDeleteDeedMutation,
  useUpdateDeedMutation,
} = usersApi;
