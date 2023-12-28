import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'

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
  // addCropper,
  // CropperState,
  // editCropper,
  updateCrop,
  // updateCroppedArea,
  updateCroppedAreaPixels,
  // updateCropper,
  updatePhotos,
  updateZoom,
} from '@/app/services/cropper-slice'
import { DefaultProfileImg } from '@/shared/assets'
import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch, useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { CloseCrop } from '@/widgets/addPostModal/ClickOutSide'
import { FilterModal } from '@/widgets/addPostModal/filterModal/FilterModal'
import { PostPhotoModificationTools } from '@/widgets/addPostModal/modificationTools/tools/post-modification-tools'
import { PostModalHeader } from '@/widgets/addPostModal/PostHeaderModal'
import { CroppedAreaPixel } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/AddAvatarModalWithoutRotation'
import getCroppedImg from '@/widgets/addProfilePhoto/addAvaWithoutRotation/crropUtils'

import { use } from 'ast-types'

const size = {
  width: 487,
  height: 504,
}

type Props = {
  closePostModal: () => void
  openPostModal: boolean
}
export const AddPostModal = ({ openPostModal, closePostModal }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [photos, setPhotos] = useState<File[]>([])

  const [errorText, setErrorText] = useState<string | undefined>()
  //  const [aspect, setAspect] = useState(1)
  // const [rotation, setRotation] = useState(-1)
  const [openCloseCrop, setCloseCropModal] = useState(false)
  const { isOpen, openModal, closeModal } = useModal()
  const inputRef = useRef<HTMLInputElement>(null)
  const croppers = useAppSelector(state => state.croppersSlice)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const selectPhotoHandler = () => {
    inputRef && inputRef.current?.click()
  }
  const readFile = (file: File) => {
    return new Promise<string>(resolve => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.readAsDataURL(file)
    })
  }
  // const handleDeletePhoto = (photo: any) => {
  //   setCroppers(croppers.filter(p => p !== photo))
  // }
  // const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: CroppedAreaPixel) => {
  //   setCroppedAreaPixels(croppedAreaPixels)
  // }, [])
  const handleZoomChange = (value: number[], id: string) => {
    dispatch(updateZoom({ zoom: value[0], id }))
    // setZoom(value[0])
  }
  // const onRotationChange = (value: number[]) => {
  //   setRotation(value[0])
  // }
  // const addNewCropper = (imageSrc: string) => {
  //   setCroppers(prevCroppers => [...prevCroppers, { imageSrc }])
  // }
  const addNewCropper = (image: string) => {
    dispatch(addNewPhoto(image))
  }
  const onCropChange = (newCrop: Record<'x' | 'y', number>, id: string) => {
    dispatch(updateCrop({ crop: newCrop, id }))
  }

  const onZoomChange = (zoom: number, id: string) => {
    dispatch(updateZoom({ zoom, id }))
  }

  // const onCropComplete = (index: number, croppedAreaPixels: CroppedAreaPixel) => {
  //   dispatch(updateCropper({ index, data: { croppedAreaPixels } }))
  // }
  const handleOnCropComplete =
    (id: string) =>
    (_croppedArea: Record<'x' | 'y', number>, croppedAreaPixels: CroppedAreaPixel) => {
      console.log('handleOnCropComplete', { croppedAreaPixels })

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
  // const handleAspectChange = (selectedAspect: string) => {
  //   switch (selectedAspect) {
  //     case 'contain':
  //       setAspect(size)
  //       break
  //     case '1/1':
  //       setAspect({ width: 487, height: 487 })
  //       break
  //     case 'vertical':
  //       setAspect({ width: 373, height: 467 })
  //       break
  //     case 'horizontal':
  //       setAspect({ width: 490, height: 276 })
  //       break
  //     default:
  //       setAspect(size)
  //   }
  //   console.log({ size, selectedAspect })
  //   // dispatch(updateCroppedAreaPixels(size))
  // }
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
  // const addNewCropperForFilter = async (imageSrc: string, index: number) => {
  //   const croppedImage = await getCroppedImg(imageSrc, croppers[index]?.croppedAreaPixels)
  //
  //   console.log('croppedImage', croppedImage)
  //   if (croppedImage) {
  //     try {
  //       const response = await fetch(croppedImage)
  //
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch image. Status: ${response.status}`)
  //       }
  //
  //       const blob = await response.blob()
  //       const croppedFile = new File([blob], 'cropped-image.jpg', { type: blob.type })
  //
  //       setPhotos(croppedFile)
  //       console.log('croppedFile', croppedFile)
  //     } catch (error) {
  //       console.error('Error converting and sending the cropped image:', error)
  //     }
  //   }
  // }
  const addNewCropperForFilter = async () => {
    const croppedImages = await Promise.all(
      croppers.map(async cropper => {
        const croppedImage = await getCroppedImg(cropper.image, cropper.croppedAreaPixels)

        // if (croppedImage) {
        //   try {
        //     const response = await fetch(croppedImage)

        //     if (!response.ok) {
        //       throw new Error(`Failed to fetch image. Status: ${response.status}`)
        //     }

        //     const blob = await response.blob()
        //     const croppedFile = new File([blob], `cropped-image-${cropper.id}.jpg`, { type: blob.type })

        //     return croppedFile
        //   } catch (error) {
        //     console.error('Error converting and sending the cropped image:', error)

        //     return null
        //   }
        // }

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
            <>
              <AddPostModalData selectPhoto={selectPhotoHandler} />
              {/*<div className={s.menuBox}>*/}
              {/*  <Swiper*/}
              {/*    modules={[Navigation, Pagination]}*/}
              {/*    spaceBetween={10}*/}
              {/*    slidesPerView={1}*/}
              {/*    className={'post-images-slider'}*/}
              {/*    navigation*/}
              {/*    pagination={{ clickable: true }}*/}
              {/*    simulateTouch={false}*/}
              {/*  >*/}
              {/*    {croppers.map(cropper => {*/}
              {/*      return (*/}
              {/*        <SwiperSlide key={cropper.id} className={s.swiper}>*/}
              {/*          <div className={s.imageBox}>*/}
              {/*            <Cropper*/}
              {/*              onCropChange={crop => onCropChange(crop, cropper.id)}*/}
              {/*              onZoomChange={zoom => onZoomChange(zoom, cropper.id)}*/}
              {/*              onCropComplete={handleOnCropComplete(cropper.id)}*/}
              {/*              crop={cropper.crop}*/}
              {/*              image={cropper.image}*/}
              {/*              showGrid={false}*/}
              {/*              //cropSize={aspect}*/}
              {/*              aspect={cropper.aspect}*/}
              {/*              //objectFit={'cover'}*/}
              {/*              zoom={cropper.zoom}*/}
              {/*              {...customStyles}*/}
              {/*              // onRotationChange={setRotation}*/}
              {/*            />*/}
              {/*          </div>*/}
              {/*          <PostPhotoModificationTools*/}
              {/*            zoomValue={[cropper.zoom]}*/}
              {/*            onChange={zoom => handleZoomChange(zoom, cropper.id)}*/}
              {/*            onAspectChange={aspect => handleAspectChange(aspect, cropper.id)}*/}
              {/*            imageId={cropper.id}*/}
              {/*            // onRotationChange={onRotationChange}*/}
              {/*            // rotationValue={[rotation]}*/}
              {/*            // deletePhoto={handleDeletePhoto}*/}
              {/*            selectNewPhoto={selectPhotoHandler}*/}
              {/*          />*/}
              {/*        </SwiperSlide>*/}
              {/*      )*/}
              {/*    })}*/}
              {/*  </Swiper>*/}
              {/*</div>*/}
            </>
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
          />
        </>
      </Modal>
    </>
  )
}
type DataProps = {
  selectPhoto: () => void
}
export const AddPostModalData = ({ selectPhoto }: DataProps) => {
  const croppers = useAppSelector(state => state.croppersSlice)
  const dispatch = useAppDispatch()
  const handleZoomChange = (value: number[], id: string) => {
    dispatch(updateZoom({ zoom: value[0], id }))
    // setZoom(value[0])
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
      console.log('handleOnCropComplete', { croppedAreaPixels })

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
            <SwiperSlide key={cropper.id} className={s.swiper}>
              <div className={s.imageBox}>
                <Cropper
                  onCropChange={crop => onCropChange(crop, cropper.id)}
                  onZoomChange={zoom => onZoomChange(zoom, cropper.id)}
                  onCropComplete={handleOnCropComplete(cropper.id)}
                  crop={cropper.crop}
                  image={cropper.image}
                  showGrid={false}
                  //cropSize={aspect}
                  aspect={cropper.aspect}
                  //objectFit={'cover'}
                  zoom={cropper.zoom}
                  {...customStyles}
                  // onRotationChange={setRotation}
                />
              </div>
              <PostPhotoModificationTools
                zoomValue={[cropper.zoom]}
                onChange={zoom => handleZoomChange(zoom, cropper.id)}
                onAspectChange={aspect => handleAspectChange(aspect, cropper.id)}
                imageId={cropper.id}
                // onRotationChange={onRotationChange}
                // rotationValue={[rotation]}
                // deletePhoto={handleDeletePhoto}
                selectNewPhoto={selectPhoto}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
