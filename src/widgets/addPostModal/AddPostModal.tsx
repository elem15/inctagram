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
import { ClickOutside } from '@/widgets/addPostModal/ClickOutSide'
import { FilterModal } from '@/widgets/addPostModal/filterModal/FilterModal'
import { PostPhotoModificationTools } from '@/widgets/addPostModal/modificationTools/tools/post-modification-tools'
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
export const AddPostModal = ({ openPostModal, closePostModal }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  // const [croppers, setCroppers] = useState<Array<{ imageSrc: string | null }>>([])
  const [photos, setPhotos] = useState<File[]>([])
  // const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  // const [zoom, setZoom] = useState<number>(1)
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixel>(null)
  const [errorText, setErrorText] = useState<string | undefined>()
  const [aspect, setAspect] = useState(1)
  // const [rotation, setRotation] = useState(-1)
  const [openCloseCrop, setCloseCropModal] = useState(false)
  const { isOpen, openModal, closeModal } = useModal()
  const inputRef = useRef<HTMLInputElement>(null)
  const croppers = useAppSelector(state => state.croppersSlice.images)
  const crop = useAppSelector(state => state.croppersSlice.crop)
  const zoom = useAppSelector(state => state.croppersSlice.zoom)
  const croppedAreaPixels = useAppSelector(state => state.croppersSlice.croppedAreaPixels)
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
  const handleZoomChange = (value: number[]) => {
    dispatch(updateZoom(value[0]))
    // setZoom(value[0])
  }
  // const onRotationChange = (value: number[]) => {
  //   setRotation(value[0])
  // }
  // const addNewCropper = (imageSrc: string) => {
  //   setCroppers(prevCroppers => [...prevCroppers, { imageSrc }])
  // }
  const addNewCropper = (image: string) => {
    dispatch(addNewPhoto({ image, id: v1() }))
  }
  const onCropChange = (newCrop: Record<'x' | 'y', number>) => {
    console.log('onCropChange', { newCrop })
    dispatch(updateCrop(newCrop))
  }

  const onZoomChange = (zoom: number) => {
    console.log('onZoomChange', { zoom })
    dispatch(updateZoom(zoom))
  }

  // const onCropComplete = (index: number, croppedAreaPixels: CroppedAreaPixel) => {
  //   dispatch(updateCropper({ index, data: { croppedAreaPixels } }))
  // }
  const handleOnCropComplete = (
    _croppedArea: Record<'x' | 'y', number>,
    croppedAreaPixels: CroppedAreaPixel
  ) => {
    console.log('handleOnCropComplete', { croppedAreaPixels })
    // dispatch(updateCrop(croppedArea))
    dispatch(updateCroppedAreaPixels(croppedAreaPixels))

    // Your additional logic here
    // console.log(
    //   `Index: ${index}, Cropped Area:`,
    //   croppedArea,
    //   'Cropped Area Pixels:',
    //   croppedAreaPixels
    // )
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
  const handleAspectChange = (selectedAspect: string) => {
    switch (selectedAspect) {
      case 'contain':
        setAspect(1)
        break
      case '1/1':
        setAspect(1 / 1)
        break
      case 'vertical':
        setAspect(4 / 9)
        break
      case 'horizontal':
        setAspect(16 / 9)
        break
      default:
        setAspect(1)
    }
  }
  const handleBack = () => {
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
        const croppedImage = await getCroppedImg(cropper.image, { ...croppedAreaPixels })

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

        return { ...cropper, image: croppedImage as string }
      })
    )

    // const filteredCroppedImages = croppedImages.filter(img => img !== null)

    console.log({ croppedImages })
    dispatch(updatePhotos(croppedImages))
    // setPhotos(prevPhotos => [...prevPhotos, ...filteredCroppedImages])
    // openModal()
  }

  console.log({ photos, aspect, croppers, imageSrc })
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

  const openCloseCropModal = (value: boolean) => {
    return setCloseCropModal(true)
  }
  const handleCloseCrop = () => {
    setCloseCropModal(false)
  }
  const handleDiscard = () => {
    setImageSrc(null)
    handleCloseCrop()
  }

  // useEffect(() => {
  //   addNewCropperForFilter()
  // }, [zoom, croppedAreaPixels, crop])

  return (
    <>
      <ClickOutside onClickOutside={openCloseCropModal}>
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
        >
          <>
            <FilterModal isOpenFilter={isOpen} closeFilter={closeModal} croppers={croppers} />

            {imageSrc ? (
              <>
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
                              onCropChange={onCropChange}
                              onZoomChange={onZoomChange}
                              onCropComplete={handleOnCropComplete}
                              crop={crop}
                              image={cropper.image}
                              showGrid={false}
                              //cropSize={aspect}
                              aspect={aspect}
                              //objectFit={'cover'}
                              zoom={zoom}
                              {...customStyles}
                              // onRotationChange={setRotation}
                            />
                            {/* <Button
                              onClick={() => addNewCropperForFilter(cropper)}
                              style={{ position: 'absolute' }}
                            >
                              Show
                            </Button> */}
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>

                  <PostPhotoModificationTools
                    zoomValue={[zoom]}
                    onChange={handleZoomChange}
                    onAspectChange={handleAspectChange}
                    // onRotationChange={onRotationChange}
                    // rotationValue={[rotation]}
                    // deletePhoto={handleDeletePhoto}
                    selectNewPhoto={selectPhotoHandler}
                  />
                </div>

                {/*<img*/}
                {/*  src={URL.createObjectURL(photos)}*/}
                {/*  style={{ width: '100px', height: '100px' }}*/}
                {/*/>*/}
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
              multiple
            />
          </>
        </Modal>
      </ClickOutside>
      {/*<CloseCrop*/}
      {/*  openCloseCrop={openCloseCrop}*/}
      {/*  closeCrop={handleCloseCrop}*/}
      {/*  onDiscard={handleDiscard}*/}
      {/*/>*/}
    </>
  )
}
type CloseCropType = {
  openCloseCrop: boolean
  closeCrop: () => void
  onDiscard: () => void
}
export const CloseCrop = ({ openCloseCrop, closeCrop, onDiscard }: CloseCropType) => {
  return (
    <Modal open={openCloseCrop} size={'sm'} title={'Close'} onClose={closeCrop}>
      <>
        <Typography variant={'regular_text_16'}>
          Do you really want to close the creation of a publication? If you close everything will be
          deleted
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '18px' }}>
          <Button variant={'outline'} onClick={() => onDiscard()}>
            Discard
          </Button>
          <Button>Save draft</Button>
        </div>
      </>
    </Modal>
  )
}
