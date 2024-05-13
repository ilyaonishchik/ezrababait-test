import { configureStore } from '@reduxjs/toolkit';
import { authApi, usersApi } from './services';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(usersApi.middleware),
});
