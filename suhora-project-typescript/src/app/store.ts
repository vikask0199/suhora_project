import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from "../features/authSlice";
import crudReducer from "../features/crudSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    crud: crudReducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
