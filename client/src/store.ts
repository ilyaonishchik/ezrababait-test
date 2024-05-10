import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/auth';
import { usersApi } from './services/users';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(usersApi.middleware),
});
