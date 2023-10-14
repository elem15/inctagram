import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit'

export interface IInitialState {
  user: string | null
  email: string | null
  isLoading: boolean
  error: any | null
  accessToken: string | null
  message: string
  statusCode: number | null
}

const initialState: IInitialState = {
  user: '',
  email: '',
  isLoading: false,
  error: '',
  accessToken: '',
  message: '',
  statusCode: null,
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
    logout: state => {
      state.accessToken = null
      state.email = null
      localStorage.clear()
    },
    setUser: (state, { payload: { user, email } }) => {
      state.user = user
      state.email = email
    },
    setLoginUser: (state, { payload: { email, accessToken } }) => {
      state.email = email
      state.accessToken = accessToken
      localStorage.setItem('email', email)
      localStorage.setItem('token', accessToken)
    },
  },
})

export const { addToken, addUser, logout, setUser, setLoginUser } = authSlice.actions
export default authSlice.reducer
