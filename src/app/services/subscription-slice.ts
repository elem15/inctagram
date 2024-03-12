import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/app/appStore'
import { useTranslation } from '@/shared/lib'

type initialType = {
  isSubscription: boolean
  amountDays: number
  subscriptionTo: string
  currentPrice: ValuePriceType
}

const initialState: initialType = {
  isSubscription: false,
  amountDays: 1,
  subscriptionTo: '',
  currentPrice: '',
}

export const subscriptionSlice = createSlice({
  initialState,
  name: 'subscriptionSlice',
  reducers: {
    setTime: (state, action: PayloadAction<initialType>) => {
      state.isSubscription = action.payload.isSubscription
      state.amountDays = action.payload.amountDays
      state.subscriptionTo = action.payload.subscriptionTo
      state.currentPrice = action.payload.currentPrice
    },
  },
})

export const { setTime } = subscriptionSlice.actions
export const selectSubscription = (state: RootState) => state.subscriptionSlice
