import { configureStore } from '@reduxjs/toolkit'

import { authReducer, authApi } from '../entities/auth'

import { appSlice } from '@/app/services'
import { profileApi } from '@/entities/profile'

const store = configureStore({
  reducer: {
    user: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [appSlice.name]: appSlice.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
