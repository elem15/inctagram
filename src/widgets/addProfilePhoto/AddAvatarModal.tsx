import React, { useState, useCallback, ChangeEvent, useRef } from 'react'

import { getOrientation } from 'get-orientation/browser'
import Cropper from 'react-easy-crop'

import { getCroppedImg, getRotatedImage } from './cropperUtils'

import { useSavePhotoMutation } from '@/entities/profile/api/profileApi'
import { DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import s from '@/widgets/addProfilePhoto/AddProfilePhotoModal.module.scss'

const ORIENTATION_TO_ANGLE: { [key: string]: number } = {
  '3': 180,
  '6': 90,
  '8': -90,
}

type Props = {
  isOpen: boolean
  closeModal: () => void
}
export type CroppedAreaPixel = {
  x: number
  y: number
  width: number
  height: number
} | null
export const AddAvatarModal = ({ isOpen, closeModal }: Props) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [rotation, setRotation] = useState<number>(0)
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixel>(null)
  const [errorText, setErrorText] = useState<string | undefined>()

  const { accessToken } = useAuth()
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)

  const [savePhoto] = useSavePhotoMutation()
  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: CroppedAreaPixel) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])
  const selectPhotoHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const saveP = async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation)

    if (croppedImage) {
      try {
        const response = await fetch(croppedImage)

        if (!response.ok) {
          throw new Error(`Failed to fetch image. Status: ${response.status}`)
        }

        const blob = await response.blob()
        const croppedFile = new File([blob], 'cropped-image.jpg', { type: blob.type })

        savePhoto({ profilePhoto: croppedFile, accessToken })
      } catch (error) {
        console.error('Error converting and sending the cropped image:', error)
      }
    }
    closeModal()
    setImageSrc(null)
    setErrorText(undefined)
  }

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]
      const acceptedTypes = ['image/jpeg', 'image/png']
      const maxSizeBytes = 1.5 * 1024 * 1024

      if (!acceptedTypes.includes(file.type)) {
        setErrorText(t.add_profile_photo.error_typy_of_photo)

        return
      }

      if (file.size > maxSizeBytes) {
        setErrorText(t.add_profile_photo.error_size_photo)

        return
      }
      let imageDataUrl: any = await readFile(file)

      try {
        const orientation = await getOrientation(file)
        const rotation = ORIENTATION_TO_ANGLE[orientation]

        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
        }
      } catch (e) {
        console.warn('failed to detect the orientation')
      }

      setImageSrc(imageDataUrl)
    }
  }

  const readFile = (file: File) => {
    return new Promise<string>(resolve => {
      const reader = new FileReader()

      reader.addEventListener('load', () => resolve(reader.result as string))
      reader.readAsDataURL(file)
    })
  }
  const customStyles = {
    style: {
      containerStyle: {
        backgroundColor: '#171717',
        backgroundPosition: 'center',
      },

      cropAreaStyle: {
        border: 'none',
      },
    },
  }
  const size = {
    width: 316,
    height: 316,
  }
  const handleCloseModal = () => {
    closeModal()
    setImageSrc(null)
    setErrorText(undefined)
  }

  return (
    <Modal
      open={isOpen}
      size={'md'}
      title={t.add_profile_photo.add_profile_photo_text}
      onClose={handleCloseModal}
    >
      <div>
        <div>
          {imageSrc ? (
            <>
              <div className={s.cropContainer}>
                <div className={s.profilePhotoBlock}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    {...customStyles}
                    cropSize={size}
                  />
                </div>
              </div>
              <div className={s.buttonBox}>
                <Button variant={'primary'} className={s.buttons} onClick={saveP}>
                  {t.add_profile_photo.save_button}
                </Button>
              </div>
            </>
          ) : (
            <div className={s.box}>
              {errorText && (
                <div className={s.errorText}>
                  <strong>{t.add_profile_photo.error}</strong>
                  {errorText}
                </div>
              )}
              <div className={s.defaultProfilePhotoBlock}>
                <DefaultProfileImg style={{ width: '3rem', height: '3rem' }} />
              </div>
              <Button variant={'primary'} className={s.buttonPhoto} onClick={selectPhotoHandler}>
                {t.add_profile_photo.text_of_button_select_from_comp}
              </Button>
            </div>
          )}
        </div>
        <input
          accept={'image/jpeg, image/png'}
          onChange={onFileChange}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
    </Modal>
  )
}
