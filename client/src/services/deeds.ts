import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Deed } from '../types/Deed';

export const deedsApi = createApi({
  reducerPath: 'deedsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/deeds/`,
    credentials: 'include',
  }),
  tagTypes: ['UserDetails'],
  endpoints: (builder) => ({
    createDeed: builder.mutation<Deed, { title: string; description: string; points: number }>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserDetails'],
    }),
  }),
});

export const { useCreateDeedMutation } = deedsApi;
