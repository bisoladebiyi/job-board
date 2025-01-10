import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { auth } from './features/auth/authSlice';
import applicant from './features/user/applicantSlice';
import employer from './features/user/employerSlice';
import { employerAPI } from './features/user/employerApiSlice';
import { applicantAPI } from './features/user/applicantApiSlice';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'applicant', 'employer'],
};

const rootReducer = combineReducers({
    [auth.reducerPath]: auth.reducer,
    [applicant.reducerPath]: applicant.reducer,
    [employer.reducerPath]: employer.reducer,
    [employerAPI.reducerPath]: employerAPI.reducer,
    [applicantAPI.reducerPath]: applicantAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
            }
        }).concat(auth.middleware).concat(employerAPI.middleware).concat(applicantAPI.middleware)
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;