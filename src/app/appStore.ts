import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../entities/auth/AuthSlice'
import counterReducer from '../entities/counter/counterSlice'

import { authApi } from '@/entities/auth/AuthApi'

const store = configureStore({
  reducer: {
    user: authReducer,
    counter: counterReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
