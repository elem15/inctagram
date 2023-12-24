import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../appStore'

import { CroppedAreaPixel } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/AddAvatarModalWithoutRotation'

interface ImageType {
  id: string
  image: string
}

interface CropType {
  x: number
  y: number
}

interface AreaPixelsType {
  width: number
  height: number
}

export interface CropperState {
  images: Array<ImageType>
  crop: CropType
  zoom: number
  croppedAreaPixels: CroppedAreaPixel
  filterClass: string
}

const initialState: CropperState = {
  images: [],
  crop: { x: 0, y: 0 },
  zoom: 1,
  croppedAreaPixels: null,
  filterClass: '',
}

export const croppersSlice = createSlice({
  initialState,
  name: 'croppersSlice',
  reducers: {
    addNewPhoto: (state, action: PayloadAction<ImageType>) => {
      state.images = [...state.images, action.payload]
    },
    deletePhoto: (state, action: PayloadAction<string>) => {
      const imageIndex = state.images.findIndex(image => image.id === action.payload)

      state.images = state.images.splice(imageIndex, 1)
    },

    updatePhotos: (state, action: PayloadAction<ImageType[]>) => {
      state.images = action.payload
    },
    updateCrop: (state, action: PayloadAction<CropType>) => {
      state.crop = action.payload
    },
    updateZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload
    },
    updateCroppedAreaPixels: (state, action: PayloadAction<CroppedAreaPixel>) => {
      state.croppedAreaPixels = action.payload
    },
    updateFilterClass: (state, action: PayloadAction<string>) => {
      state.filterClass = action.payload
    },
    removeAllPhotos: state => {
      state.images = []
    },
    // removeCropper: (state, action: PayloadAction<number>) => {
    //   const index = action.payload
    //   state.splice(index, 1)
    // },
    // addCropper: (state, action: PayloadAction<{ image: string; id: string }>) => {
    //   state.push({
    //     imageSrc: action.payload.image,
    //     id: action.payload.id,
    //     crop: { x: 0, y: 0 },
    //     zoom: 1,
    //     croppedAreaPixels: null,
    //     filterClass: '',
    //   })
    // },
    // updateCropper: (state, action: PayloadAction<{ data: Partial<CropperState> }>) => {
    //   const { data } = action.payload
    //   state.map(s => ({ ...s, ...data }))
    // },
    // editCropper: (state, action: PayloadAction<CropperState[]>) => {
    //   state = action.payload
    // },
    // updateFilterClass: (state, action: PayloadAction<{ index: number; filter: string }>) => {
    //   const { index, filter } = action.payload
    //   state[index].filterClass = filter
    // },
    // updateCroppedArea: (
    //   state,
    //   action: PayloadAction<{
    //     croppedArea: { x: number; y: number }
    //   }>
    // ) => {
    //   const { croppedArea } = action.payload
    //   state.map(s => ({ ...s, croppedAreaPixels: { ...s.croppedAreaPixels, croppedArea } }))
    // },
    // updateCroppedAreaPixels: (
    //   state,
    //   action: PayloadAction<{
    //     croppedAreaPixels: { width: number; height: number }
    //   }>
    // ) => {
    //   console.log('action payload: ', action.payload)
    //   const { croppedAreaPixels } = action.payload
    //   const newState: CropperState[] = state.map(s => ({
    //     ...s,
    //     croppedAreaPixels: { x: 0, y: 0, ...croppedAreaPixels },
    //   }))
    //   return newState
    // },
  },
})
export const {
  addNewPhoto,
  updateCrop,
  updateZoom,
  updateCroppedAreaPixels,
  updateFilterClass,
  updatePhotos,
  deletePhoto,
  removeAllPhotos,
  // removeCropper,
  // addCropper,
  // updateCroppedAreaPixels,
  // updateCroppedArea,
  // updateCropper,
  // updateFilterClass,
  // editCropper,
} = croppersSlice.actions
