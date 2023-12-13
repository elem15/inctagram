import { configureStore } from '@reduxjs/toolkit'

import { authReducer, authApi } from '../entities/auth'

import { appSlice } from '@/app/services'
import { countriesApi } from '@/entities/countries/'
import { postsApi } from '@/entities/posts'
import { profileApi } from '@/entities/profile'

const store = configureStore({
  reducer: {
    user: authReducer,
    [appSlice.name]: appSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      countriesApi.middleware,
      postsApi.middleware
    ),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
