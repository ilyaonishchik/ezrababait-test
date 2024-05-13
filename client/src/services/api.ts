import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PaginatedResponse, UpdateDeedDto, MessageResponse, UpdateUserDto } from '../types/RTK';
import { Deed, User, UserDetails, UserFollowingStatus } from '../types/entities';

type GetUsersRequest = {
  page: number;
  take: number;
  followerId?: number;
  followingId?: number;
  query?: string;
};

export const api = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/`,
    credentials: 'include',
  }),
  tagTypes: ['Me', 'Users', 'UserDetails', 'UserDeeds', 'UserFollowingStatus'],
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => 'auth/me',
      providesTags: ['Me'],
    }),
    signIn: builder.mutation<{ message: string }, { username: string; password: string }>({
      query: (body) => ({
        url: 'auth/sign-in',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    signUp: builder.mutation<{ message: string }, { email: string; username: string; password: string }>({
      query: (body) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    signOut: builder.mutation<{ message: string }, void>({
      query: () => ({ url: 'auth/sign-out', method: 'POST' }),
      invalidatesTags: ['Me'],
    }),
    updateMe: builder.mutation<MessageResponse, UpdateUserDto>({
      query: (body) => ({
        url: 'users/me',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Me', 'Users', 'UserDetails'],
    }),
    deleteMe: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: 'users/me',
        method: 'DELETE',
      }),
      invalidatesTags: ['Users', 'UserDetails', 'UserDeeds', 'UserFollowingStatus'],
    }),
    toggleFollowing: builder.mutation<{ message: string }, { userId: number }>({
      query: ({ userId }) => ({
        url: `users/${userId}/toggle-following`,
        method: 'POST',
      }),
      invalidatesTags: ['UserFollowingStatus', 'UserDetails', 'Users'],
    }),
    getUserFollowingStatus: builder.query<UserFollowingStatus, { userId: number }>({
      query: ({ userId }) => `users/${userId}/following-status`,
      providesTags: ['UserFollowingStatus'],
    }),
    getUsers: builder.query<PaginatedResponse<User>, GetUsersRequest>({
      query: ({ page, take, followerId, followingId, query }) =>
        `users/?page=${page}&take=${take}&followerId=${followerId}&followingId=${followingId}&query=${query}`,
      providesTags: ['Users'],
    }),
    getUserDetails: builder.query<UserDetails, { userId: number }>({
      query: ({ userId }) => `users/${userId}/details`,
      providesTags: ['UserDetails'],
    }),
    getUserDeeds: builder.query<PaginatedResponse<Deed>, { userId: number; page: number; take: number }>({
      query: ({ userId, page, take }) => `users/${userId}/deeds?page=${page}&take=${take}`,
      providesTags: ['UserDeeds'],
    }),
    createDeed: builder.mutation<Deed, { userId: number; title: string; description: string; points: number }>({
      query: (body) => ({
        url: `users/${body.userId}/deeds`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserDetails', 'UserDeeds'],
    }),
    updateDeed: builder.mutation<{ message: string }, { userId: number; deedId: number; body: UpdateDeedDto }>({
      query: ({ userId, deedId, body }) => ({
        url: `users/${userId}/deeds/${deedId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['UserDeeds', 'UserDetails'],
    }),
    deleteDeed: builder.mutation<Deed, { userId: number; deedId: number }>({
      query: ({ userId, deedId }) => ({
        url: `users/${userId}/deeds/${deedId}`,
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
  useGetUserFollowingStatusQuery,
  useToggleFollowingMutation,
  useDeleteMeMutation,
  useUpdateMeMutation,
  useGetMeQuery,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
} = api;
