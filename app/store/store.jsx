"use client";

import { configureStore } from "@reduxjs/toolkit";
import api from "./services/api";
import userReducer from "./Features/userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
