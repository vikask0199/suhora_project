import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from "../features/authSlice"
import crudReducer from "../features/crudSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        crud: crudReducer,
    }
})

setupListeners(store.dispatch)