import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit'

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
  error: any | null
  accessToken: string | null
  message: string
  statusCode: number | null
}

const initialState: IInitialState = {
  email: '',
  isLoading: false,
  error: '',
  accessToken: '',
  message: '',
  statusCode: null,
}

export interface IAuthResponse {}

export const signUpUser = createAsyncThunk<any, IEmailPasswordUser>(
  'signupuser',
  async ({ email, userName, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://incta.online/api/v1/auth/registratio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, password }),
      })

      if (!response.ok) {
        throw new Error('Server Error')
      }

      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
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
      state.accessToken = localStorage.getItem('token')
    },
    addUser: (state, action) => {
      state.email = localStorage.getItem('email')
    },
    logout: state => {
      state.accessToken = null
      state.email = null
      localStorage.clear()
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpUser.pending, state => {
        state.isLoading = true
      })
      .addCase(signUpUser.fulfilled, (state, { payload: { statusCode } }) => {
        state.isLoading = false
        state.statusCode = statusCode
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

    builder
      .addCase(signInUser.pending, state => {
        state.isLoading = true
      })
      .addCase(
        signInUser.fulfilled,
        (state, { payload: { accessToken, error, messages, email } }) => {
          state.isLoading = false
          if (error) {
            state.error = error
            state.message = messages.message
          } else {
            state.accessToken = accessToken
            state.email = email

            localStorage.setItem('email', email)
            localStorage.setItem('token', accessToken)
          }
        }
      )
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false
      })
  },
})

export const { addToken, addUser, logout } = authSlice.actions
export default authSlice.reducer
