import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '@/app/appStore'

export interface IInitialState {
  user: string | null
  email: string | null
  accessToken: string | null
}

const initialState: IInitialState = {
  user: '',
  email: '',
  accessToken: '',
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.accessToken = action.payload
    },
    addUser: (state, action) => {
      state.email = action.payload
    },
    clearLocalUserData: state => {
      state.accessToken = null
      state.email = null
      localStorage.clear()
    },
    setUser: (state, { payload: { user, email } }) => {
      state.user = user
      state.email = email
      state.accessToken = ''
      localStorage.setItem('email', email)
      localStorage.setItem('token', '')
    },
    setLoginUser: (state, { payload: { email, accessToken } }) => {
      state.email = email
      state.accessToken = accessToken
      localStorage.setItem('email', email)
      localStorage.setItem('token', accessToken)
    },
  },
})

export const { addToken, addUser, clearLocalUserData, setUser, setLoginUser } = authSlice.actions

export const selectAuthUser = (state: RootState) => state.user

export default authSlice.reducer
