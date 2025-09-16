import { configureStore } from "@reduxjs/toolkit";
import { api } from "./baseApi";
import tokenReducer from './slice/tokenSlice';
import userReducer from './slice/useSlice';
import languageReducer from "./slice/languageSlice";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        token: tokenReducer,
        user: userReducer,
          language: languageReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(api.middleware),
})
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch