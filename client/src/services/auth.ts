import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types/User';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/auth/`,
    credentials: 'include',
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => 'me',
      providesTags: ['User'],
    }),
    signIn: builder.mutation<{ message: string }, { username: string; password: string }>({
      query: (body) => ({
        url: 'sign-in',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    signUp: builder.mutation<{ message: string }, { email: string; username: string; password: string }>({
      query: (body) => ({
        url: 'sign-up',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    signOut: builder.mutation<{ message: string }, void>({
      query: () => ({ url: 'sign-out', method: 'POST' }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useGetMeQuery, useSignOutMutation, useSignInMutation, useSignUpMutation } = authApi;
