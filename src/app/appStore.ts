import { configureStore } from '@reduxjs/toolkit'

import { authReducer, authApi } from '../entities/auth'

import { appSlice } from '@/app/services'
import { countriesApi } from '@/entities/countries/api/countriesApi'
import { profileApi } from '@/entities/profile'
import { publicPostsApi } from '@/entities/publicPosts'

const store = configureStore({
  reducer: {
    user: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [appSlice.name]: appSlice.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [publicPostsApi.reducerPath]: publicPostsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      profileApi.middleware,
      countriesApi.middleware,
      publicPostsApi.middleware
    ),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
