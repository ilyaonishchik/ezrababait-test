import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/auth';
import { usersApi } from './services/users';
import { deedsApi } from './services/deeds';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [deedsApi.reducerPath]: deedsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(usersApi.middleware).concat(deedsApi.middleware),
});
