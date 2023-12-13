import React, { ChangeEvent, useCallback, useRef, useState } from 'react'

import Cropper from 'react-easy-crop'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './post-images-slider.css'
import 'swiper/scss'

import s from './AddPostModal.module.scss'

import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import { DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { FilterModal } from '@/widgets/addPostModal/filterModal/FilterModal'
import { PostPhotoModificationTools } from '@/widgets/addPostModal/modificationTools/tools/post-modification-tools'
import { PostModalHeader } from '@/widgets/addPostModal/PostHeaderModal'
import { CroppedAreaPixel } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/AddAvatarModalWithoutRotation'
import getCroppedImg from '@/widgets/addProfilePhoto/addAvaWithoutRotation/crropUtils'

const size = {
  width: 487,
  height: 504,
}

export const AddPostModal = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [croppers, setCroppers] = useState<Array<{ imageSrc: string | null }>>([])
  const [photos, setPhotos] = useState<File[]>([])
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixel>(null)
  const [errorText, setErrorText] = useState<string | undefined>()
  const [aspect, setAspect] = useState(size)
  // const [rotation, setRotation] = useState(-1)
  const { isOpen, openModal, closeModal } = useModal()
  const inputRef = useRef<HTMLInputElement>(null)

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
  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: CroppedAreaPixel) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  const handleZoomChange = (value: number[]) => {
    setZoom(value[0])
  }
  // const onRotationChange = (value: number[]) => {
  //   setRotation(value[0])
  // }
  const addNewCropper = (imageSrc: string) => {
    setCroppers(prevCroppers => [...prevCroppers, { imageSrc }])
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
  const handleAspectChange = (selectedAspect: string) => {
    switch (selectedAspect) {
      case 'contain':
        setAspect(size)
        break
      case '1/1':
        setAspect({ width: 487, height: 487 })
        break
      case 'vertical':
        setAspect({ width: 373, height: 467 })
        break
      case 'horizontal':
        setAspect({ width: 490, height: 276 })
        break
      default:
        setAspect(size)
    }
  }
  const handleBack = () => {
    setImageSrc(null)
  }
  const addNewCropperForFilter = async (imageSrc: string) => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)

    if (croppedImage) {
      try {
        const response = await fetch(croppedImage)

        if (!response.ok) {
          throw new Error(`Failed to fetch image. Status: ${response.status}`)
        }

        const blob = await response.blob()
        const croppedFile = new File([blob], 'cropped-image.jpg', { type: blob.type })

        setPhotos(prevPhotos => [...prevPhotos, croppedFile])
      } catch (error) {
        console.error('Error converting and sending the cropped image:', error)
      }
    }
  }
  const handleOpenFilter = () => {
    if (imageSrc) {
      addNewCropperForFilter(imageSrc)
      openModal()
    }
  }

  // const titleOfModalDraft = (
  //   <div style={{ display: 'flex', gap: '117px', alignItems: 'center' }}>
  //     <Button variant={'link'} onClick={handleBack}>
  //       <IconLeft />
  //     </Button>
  //     <Typography variant={'h1'}>Cropping</Typography>
  //     <Button variant={'link'} style={{ fontSize: '16px' }} onClick={handleOpenFilter}>
  //       Next
  //     </Button>
  //     <FilterModal isOpen={isOpen} imgPost={photos} closeFilter={closeModal} />
  //   </div>
  // )

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
    <Modal
      open={true}
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
    >
      <>
        <FilterModal isOpenFilter={isOpen} imgPost={photos} closeFilter={closeModal} />
        {imageSrc ? (
          <div className={s.menuBox}>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={10}
              slidesPerView={1}
              className={'post-images-slider'}
              navigation
              pagination={{ clickable: true }}
            >
              {croppers.map((cropper, index) => (
                <SwiperSlide key={index} className={s.swiper}>
                  <div className={s.imageBox}>
                    <Cropper
                      onCropChange={setCrop}
                      crop={crop}
                      image={cropper.imageSrc}
                      showGrid={false}
                      cropSize={aspect}
                      // rotation={rotation}
                      {...customStyles}
                      objectFit={'cover'}
                      zoom={zoom}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      // onRotationChange={setRotation}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <PostPhotoModificationTools
              zoomValue={[zoom]}
              onChange={handleZoomChange}
              onAspectChange={handleAspectChange}
              // onRotationChange={onRotationChange}
              // rotationValue={[rotation]}

              selectNewPhoto={selectPhotoHandler}
              photos={croppers}
            />
          </div>
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
  )
}
