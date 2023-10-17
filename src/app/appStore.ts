import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../entities/auth/authSlice'

import { authApi } from '@/entities/auth/authApi'

const store = configureStore({
  reducer: {
    user: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
