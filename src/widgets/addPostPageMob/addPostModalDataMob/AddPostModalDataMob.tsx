import React from 'react'

import Cropper from 'react-easy-crop'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import '@/shared/assets/swiperStyle/post-images-slider.scss'
import s from './AddPostModalDataMob.module.scss'

import { useAppSelector } from '@/app/appStore'
import {
  addNewPhoto,
  updateAspect,
  updateCrop,
  updateCroppedAreaPixels,
  updateZoom,
} from '@/app/services/cropper-slice'
import { CloseIcon } from '@/shared/assets/icons/CloseIcon'
import { Button, Typography } from '@/shared/components'
import { useAppDispatch } from '@/shared/lib'
import { useGeneralInputRefForPost } from '@/widgets/addPostModal/AddPostModal'
import { PostPhotoModificationTools } from '@/widgets/addPostModal/modificationTools/tools/post-modification-tools'
import { CroppedAreaPixel } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/AddAvatarModalWithoutRotation'
type Props = {
  selectPhoto: () => void
}
export const AddPostModalDataMob = ({ selectPhoto }: Props) => {
  const croppers = useAppSelector(state => state.croppersSlice)
  const dispatch = useAppDispatch()
  const handleZoomChange = (value: number[], id: string) => {
    dispatch(updateZoom({ zoom: value[0], id }))
  }

  const onCropChange = (newCrop: Record<'x' | 'y', number>, id: string) => {
    dispatch(updateCrop({ crop: newCrop, id }))
  }

  const onZoomChange = (zoom: number, id: string) => {
    dispatch(updateZoom({ zoom, id }))
  }
  const handleAspectChange = (selectedAspect: string, id: string) => {
    switch (selectedAspect) {
      case 'contain':
        dispatch(updateAspect({ aspect: 1, id }))
        break
      case '1/1':
        dispatch(updateAspect({ aspect: 1, id }))
        break
      case 'vertical':
        dispatch(updateAspect({ aspect: 4 / 9, id }))
        break
      case 'horizontal':
        dispatch(updateAspect({ aspect: 16 / 9, id }))
        break
      default:
        dispatch(updateAspect({ aspect: 1, id }))
    }
  }
  const handleOnCropComplete =
    (id: string) =>
    (_croppedArea: Record<'x' | 'y', number>, croppedAreaPixels: CroppedAreaPixel) => {
      dispatch(updateCroppedAreaPixels({ croppedAreaPixels: croppedAreaPixels, id }))
    }
  const customStyles = {
    style: {
      containerStyle: {
        backgroundColor: '#333',
        backgroundPosition: 'center',
      },

      cropAreaStyle: {
        border: 'none',
      },
    },
  }

  return (
    <div className={s.menuBox}>
      <div className={s.titleBox}>
        <Button variant={`link`}>
          <CloseIcon />
        </Button>
        <Typography variant={`h2`}>New Publication</Typography>
        <Button variant={`link`}>Next</Button>
      </div>
      <div className={s.container}>
        <div className={s.imgBox}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            className={'post-images-slider'}
            navigation
            pagination={{ clickable: true }}
            simulateTouch={false}
          >
            {croppers.map(cropper => {
              return (
                <SwiperSlide key={cropper.id}>
                  <div key={cropper.id}>
                    <div className={s.imageBox}>
                      <Cropper
                        onCropChange={crop => onCropChange(crop, cropper.id)}
                        onZoomChange={zoom => onZoomChange(zoom, cropper.id)}
                        onCropComplete={handleOnCropComplete(cropper.id)}
                        crop={cropper.crop}
                        image={cropper.image}
                        showGrid={false}
                        aspect={cropper.aspect}
                        zoom={cropper.zoom}
                        {...customStyles}
                      />
                    </div>
                    <PostPhotoModificationTools
                      zoomValue={[cropper.zoom]}
                      onChange={zoom => handleZoomChange(zoom, cropper.id)}
                      onAspectChange={aspect => handleAspectChange(aspect, cropper.id)}
                      imageId={cropper.id}
                      selectNewPhoto={selectPhoto}
                    />
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
