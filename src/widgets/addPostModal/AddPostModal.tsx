import React, { ChangeEvent, useRef, useState } from 'react'

import Cropper from 'react-easy-crop'
import { Navigation, Pagination, A11y, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './post-images-slider.css'
// import 'swiper/scss'

import { v1 } from 'uuid'

import s from './AddPostModal.module.scss'

//
// import 'swiper/scss/navigation'
// import 'swiper/scss/pagination'
// import 'swiper/scss/scrollbar'
import { useAppSelector } from '@/app/appStore'
import {
  addNewPhoto,
  removeAllPhotos,
  updateAspect,
  updateCrop,
  updateCroppedAreaPixels,
  updatePhotos,
  updateZoom,
} from '@/app/services/cropper-slice'
import { DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch, useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { AddPostModalData } from '@/widgets/addPostModal/addPostModalData'
import { CloseCrop } from '@/widgets/addPostModal/ClickOutSide'
import { FilterModal } from '@/widgets/addPostModal/filterModal/FilterModal'
import { PostModalHeader } from '@/widgets/addPostModal/PostHeaderModal'
import { CroppedAreaPixel } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/AddAvatarModalWithoutRotation'
import getCroppedImg from '@/widgets/addProfilePhoto/addAvaWithoutRotation/crropUtils'

const size = {
  width: 487,
  height: 504,
}

type Props = {
  closePostModal: () => void
  openPostModal: boolean
}
export const useGeneralInputRefForPost = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const selectPhotoHandler = () => {
    inputRef && inputRef.current?.click()
  }

  return {
    inputRef,
    selectPhotoHandler,
  }
}
export const useErrorText = () => {
  const [errorText, setErrorText] = useState<string | undefined>()
  const showErrorText = (text: string) => {
    setErrorText(text)
  }

  return {
    errorText,
    showErrorText,
  }
}
export const readFile = (file: File) => {
  return new Promise<string>(resolve => {
    const reader = new FileReader()

    reader.addEventListener('load', () => resolve(reader.result as string))
    reader.readAsDataURL(file)
  })
}
export const AddPostModal = ({ openPostModal, closePostModal }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [errorText, setErrorText] = useState<string | undefined>()
  const [openCloseCrop, setCloseCropModal] = useState(false)
  const { isOpen, openModal, closeModal } = useModal()
  const { selectPhotoHandler, inputRef } = useGeneralInputRefForPost()
  // const inputRef = useRef<HTMLInputElement>(null)
  const croppers = useAppSelector(state => state.croppersSlice)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  // export const selectPhotoHandler = () => {
  //   inputRef && inputRef.current?.click()
  // }
  // const readFile = (file: File) => {
  //   return new Promise<string>(resolve => {
  //     const reader = new FileReader()
  //
  //     reader.addEventListener('load', () => resolve(reader.result as string))
  //     reader.readAsDataURL(file)
  //   })
  // }
  const handleZoomChange = (value: number[], id: string) => {
    dispatch(updateZoom({ zoom: value[0], id }))
  }
  const addNewCropper = (image: string) => {
    dispatch(addNewPhoto(image))
  }
  const onCropChange = (newCrop: Record<'x' | 'y', number>, id: string) => {
    dispatch(updateCrop({ crop: newCrop, id }))
  }

  const onZoomChange = (zoom: number, id: string) => {
    dispatch(updateZoom({ zoom, id }))
  }

  const handleOnCropComplete =
    (id: string) =>
    (_croppedArea: Record<'x' | 'y', number>, croppedAreaPixels: CroppedAreaPixel) => {
      dispatch(updateCroppedAreaPixels({ croppedAreaPixels: croppedAreaPixels, id }))
    }

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]
      const acceptedTypes = ['image/jpeg', 'image/png']
      const maxSizeBytes = 20 * 1024 * 1024

      if (!acceptedTypes.includes(file.type)) {
        setErrorText(t.add_profile_photo.error_type_of_photo)

        return
      }

      if (file.size > maxSizeBytes) {
        setErrorText(t.add_profile_photo.error_size_photo)

        return
      }
      let imageDataUrl: any = await readFile(file)

      setImageSrc(imageDataUrl)
      addNewCropper(imageDataUrl)
    }
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
  const handleBack = () => {
    dispatch(removeAllPhotos())
    setImageSrc(null)
  }
  const handleClosePostCropModal = () => {
    closePostModal()
    dispatch(removeAllPhotos())
    setImageSrc(null)
  }
  const addNewCropperForFilter = async () => {
    const croppedImages = await Promise.all(
      croppers.map(async cropper => {
        const croppedImage = await getCroppedImg(cropper.image, cropper.croppedAreaPixels)

        return {
          id: cropper.id,
          image: croppedImage as string,
          croppedAreaPixels: cropper.croppedAreaPixels,
        }
      })
    )

    dispatch(updatePhotos(croppedImages))
  }

  const handleOpenFilter = () => {
    addNewCropperForFilter()
    openModal()
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

  const handleDiscard = () => {
    setCloseCropModal(false)
    handleClosePostCropModal()
  }

  const handleInteractOutsideOfCrop = (event: FocusEvent | MouseEvent | TouchEvent) => {
    event.preventDefault()
    imageSrc && setCloseCropModal(true)
  }

  return (
    <>
      <CloseCrop
        openCloseCrop={openCloseCrop}
        closeCrop={() => setCloseCropModal(false)}
        onDiscard={handleDiscard}
      />
      <Modal
        open={openPostModal}
        size={'md'}
        title={
          imageSrc ? (
            <PostModalHeader
              closeModal={handleBack}
              title={'Cropping'}
              gap={'57%'}
              onNext={handleOpenFilter}
            />
          ) : (
            'Add photo'
          )
        }
        showCloseButton={imageSrc ? false : true}
        isPost={true}
        onClose={closePostModal}
        onInteractOutside={handleInteractOutsideOfCrop}
      >
        <>
          <FilterModal
            isOpenFilter={isOpen}
            closeFilter={closeModal}
            closeCroppingModal={handleClosePostCropModal}
          />

          {imageSrc ? (
            <AddPostModalData selectPhoto={selectPhotoHandler} />
          ) : (
            <div className={s.modalBox}>
              {errorText && (
                <div className={s.errorText}>
                  <strong>{t.add_profile_photo.error}</strong>
                  {errorText}
                </div>
              )}
              <div className={s.box}>
                <DefaultProfileImg style={{ width: '3rem', height: '3rem' }} />
              </div>

              <Button
                variant={'primary'}
                style={{ marginBottom: '24px' }}
                onClick={selectPhotoHandler}
              >
                Select from computer
              </Button>
              <Button variant={'outline'} style={{ width: '170px' }}>
                Open Draft
              </Button>
            </div>
          )}
          <input
            accept={'image/jpeg, image/png'}
            onChange={onFileChange}
            ref={inputRef}
            style={{ display: 'none' }}
            type={'file'}
            multiple
          />
        </>
      </Modal>
    </>
  )
}
