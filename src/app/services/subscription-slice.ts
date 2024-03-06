import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/app/appStore'

type initialType = {
  isSubscription: boolean
  subscriptionFrom: string
  subscriptionTo: string
}

const initialState: initialType = {
  isSubscription: false,
  subscriptionFrom: '',
  subscriptionTo: '',
}

export const subscriptionSlice = createSlice({
  initialState,
  name: 'subscriptionSlice',
  reducers: {
    setTime: (state, action: PayloadAction<initialType>) => {
      state.isSubscription = action.payload.isSubscription
      state.subscriptionFrom = action.payload.subscriptionFrom
      state.subscriptionTo = action.payload.subscriptionTo
    },
  },
})

export const { setTime } = subscriptionSlice.actions
export const selectSubscription = (state: RootState) => state.subscriptionSlice
