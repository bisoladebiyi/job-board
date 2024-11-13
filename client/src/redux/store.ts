import { configureStore } from '@reduxjs/toolkit';
import { auth } from './features/auth/authSlice';
import user from './features/user/userSlice'

export const store = configureStore({
    reducer: {
        [auth.reducerPath]: auth.reducer,
        [user.reducerPath]: user.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(auth.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;