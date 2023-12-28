import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { v1 } from 'uuid'

import { RootState } from '../appStore'

import { CroppedAreaPixel } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/AddAvatarModalWithoutRotation'

interface CropType {
  x: number
  y: number
}

export interface CropperState {
  id: string
  image: string
  crop: CropType
  zoom: number
  croppedAreaPixels: CroppedAreaPixel
  filterClass: string
  aspect: number
}

const initialState: CropperState[] = []

export const croppersSlice = createSlice({
  initialState,
  name: 'croppersSlice',
  reducers: {
    addNewPhoto: (state, action: PayloadAction<string>) => {
      const newData: CropperState = {
        id: v1(),
        image: action.payload,
        crop: { x: 0, y: 0 },
        zoom: 1,
        croppedAreaPixels: null,
        filterClass: '',
        aspect: 1,
      }

      state.push(newData)
    },
    deletePhoto: (state, action: PayloadAction<string>) => {
      const imageIndex = state.findIndex(image => image.id === action.payload)

      if (imageIndex !== -1) state.splice(imageIndex, 1)
    },

    updatePhotos: (
      state,
      action: PayloadAction<{ id: string; image: string; croppedAreaPixels: CroppedAreaPixel }[]>
    ) => {
      const payload = action.payload

      payload.forEach(photo => {
        const { id, image, croppedAreaPixels } = photo
        const index = state.findIndex(img => img.id === id)

        if (index !== -1) {
          state[index].image = image
          state[index].croppedAreaPixels = croppedAreaPixels
        }
      })
    },
    updateCrop: (state, action: PayloadAction<{ id: string; crop: CropType }>) => {
      const { crop, id } = action.payload
      const photo = state.find(image => image.id === id)

      if (photo) photo.crop = crop
    },
    updateZoom: (state, action: PayloadAction<{ id: string; zoom: number }>) => {
      const photo = state.find(image => image.id === action.payload.id)

      if (photo) photo.zoom = action.payload.zoom
    },
    updateCroppedAreaPixels: (
      state,
      action: PayloadAction<{ id: string; croppedAreaPixels: CroppedAreaPixel }>
    ) => {
      const photo = state.find(image => image.id === action.payload.id)

      if (photo) photo.croppedAreaPixels = action.payload.croppedAreaPixels
    },
    updateFilterClass: (state, action: PayloadAction<{ id: string; filterClass: string }>) => {
      const photo = state.find(image => image.id === action.payload.id)

      if (photo) photo.filterClass = action.payload.filterClass
    },

    updateAspect: (state, action: PayloadAction<{ id: string; aspect: number }>) => {
      const photo = state.find(image => image.id === action.payload.id)

      if (photo) photo.aspect = action.payload.aspect
    },
    removeAllPhotos: state => {
      state = []
    },
    setImage: (state, action: PayloadAction<{ image: CropperState[] }>) => {
      return action.payload.image.map(tl => ({ ...tl }))
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
  updateAspect,
  deletePhoto,
  removeAllPhotos,
  setImage,
  // updateFilteredImage,
  // removeCropper,
  // addCropper,
  // updateCroppedAreaPixels,
  // updateCroppedArea,
  // updateCropper,
  // updateFilterClass,
  // editCropper,
} = croppersSlice.actions
