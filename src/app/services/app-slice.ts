import { PayloadAction, createSlice } from '@reduxjs/toolkit'
type InitType = {
  message: string
  variant: 'error' | 'info'
}

const initialState: InitType = {
  message: '',
  variant: 'error',
}

export const appSlice = createSlice({
  initialState,
  name: 'appSlice',
  reducers: {
    clearAlert: state => {
      state.message = ''
      state.variant = 'info'
    },
    setAlert: (state, action: PayloadAction<{ message: string; variant: 'error' | 'info' }>) => {
      state.message = action.payload.message
      state.variant = action.payload.variant
    },
  },
})
export const { clearAlert, setAlert } = appSlice.actions
