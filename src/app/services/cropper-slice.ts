import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../appStore'

import { CroppedAreaPixel } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/AddAvatarModalWithoutRotation'
interface CropperState {
  imageSrc: string | null
  crop: { x: number; y: number }
  zoom: number
  croppedAreaPixels: CroppedAreaPixel | null
  filterClass: string
}

const initialState: CropperState[] = []

export const croppersSlice = createSlice({
  initialState,
  name: 'croppersSlice',
  reducers: {
    removeCropper: (state, action: PayloadAction<number>) => {
      const index = action.payload

      state.splice(index, 1)
    },
    addCropper: (state, action: PayloadAction<string>) => {
      state.push({
        imageSrc: action.payload,
        crop: { x: 0, y: 0 },
        zoom: 1,
        croppedAreaPixels: null,
        filterClass: '',
      })
    },
    updateCropper: (
      state,
      action: PayloadAction<{ index: number; data: Partial<CropperState> }>
    ) => {
      const { index, data } = action.payload

      state[index] = { ...state[index], ...data }
    },
    updateFilterClass: (state, action: PayloadAction<{ index: number; filter: string }>) => {
      const { index, filter } = action.payload

      state[index].filterClass = filter
    },
    updateCroppedArea: (
      state,
      action: PayloadAction<{
        index: number
        croppedArea: { x: number; y: number; width: number; height: number }
      }>
    ) => {
      const { index, croppedArea } = action.payload

      state[index].crop = croppedArea
    },
    updateCroppedAreaPixels: (
      state,
      action: PayloadAction<{
        index: number
        croppedAreaPixels: { width: number; height: number; x: number; y: number }
      }>
    ) => {
      const { index, croppedAreaPixels } = action.payload

      state[index].croppedAreaPixels = croppedAreaPixels
    },
  },
})
export const {
  removeCropper,
  addCropper,
  updateCroppedAreaPixels,
  updateCroppedArea,
  updateCropper,
  updateFilterClass,
} = croppersSlice.actions
