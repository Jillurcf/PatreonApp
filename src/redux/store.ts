import { configureStore } from "@reduxjs/toolkit";
import { api } from "./baseApi";
import tokenReducer from './slice/tokenSlice';
import userReducer from './slice/useSlice';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        token: tokenReducer,
        user: userReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch