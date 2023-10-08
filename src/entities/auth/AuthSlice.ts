import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/app/appStore'

export interface IEmailPassword {
  email: string
  password: string
}

export interface IEmailPasswordUser extends IEmailPassword {
  userName: string
}

export interface IInitialState {
  email: string | null
  isLoading: boolean
  error: string | null
  token: string | null
  message: string
}

const initialState: IInitialState = {
  email: '',
  isLoading: false,
  error: '',
  token: '',
  message: '',
}

export interface IAuthResponse {}

export const signUpUser = createAsyncThunk<any, IEmailPasswordUser>(
  'signupuser',
  async ({ email, userName, password }) => {
    const response = await fetch('https://incta.online/api/v1/auth/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, userName }),
    })

    return await response.json()
  }
)

export const signInUser = createAsyncThunk<any, IEmailPassword>(
  'signinuser',
  async ({ email, password }) => {
    const response = await fetch('https://incta.online/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    return await response.json()
  }
)

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = localStorage.getItem('token')
    },
    addUser: (state, action) => {
      state.email = localStorage.getItem('email')
    },
    logout: state => {
      state.token = null
      state.email = null
      localStorage.clear()
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpUser.pending, state => {
        state.isLoading = true
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false
      })

    builder
      .addCase(signInUser.pending, state => {
        state.isLoading = true
      })
      .addCase(signInUser.fulfilled, (state, { payload: { token, error, messages, email } }) => {
        state.isLoading = false
        if (error) {
          state.error = error
        } else {
          state.token = token
          state.message = messages.message
          state.email = email

          localStorage.setItem('message', messages.message)
          localStorage.setItem('email', email)
          localStorage.setItem('token', token)
        }
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const { addToken, addUser, logout } = authSlice.actions
export default authSlice.reducer
