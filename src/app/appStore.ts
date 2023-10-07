import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../entities/auth/AuthSlice'
import counterReducer from '../entities/counter/counterSlice'

const store = configureStore({
  reducer: {
    user: authReducer,
    counter: counterReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
