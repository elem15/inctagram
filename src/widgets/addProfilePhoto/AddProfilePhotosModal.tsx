import { ChangeEvent, useRef, useState } from 'react'

import Cropper from 'react-easy-crop'

import s from './AddProfilePhotoModal.module.scss'

import { useSavePhotoMutation } from '@/entities/profile/api/profileApi'
import { DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'

type Propss = {
  isOpen: boolean
  closeModal: () => void
}
export const AddProfilePhotoModal = ({ isOpen, closeModal }: Propss) => {
  const [profilePhoto, setProfilePhoto] = useState<Blob | undefined>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [errorText, setErrorText] = useState<string | undefined>()
  const { t } = useTranslation()
  const [savePhoto] = useSavePhotoMutation()
  const onCropChange = (crop: any) => {
    setCrop(crop)
  }

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedAreaPixels.width / croppedAreaPixels.height)
  }

  const onZoomChange = (zoom: any) => {
    setZoom(zoom)
  }
  const selectPhotoHandler = () => {
    inputRef && inputRef.current?.click()
  }
  let text
  const onMainFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files?.[0]

    if (selectedFile) {
      const acceptedTypes = ['image/jpeg', 'image/png']
      const maxSizeBytes = 10 * 1024 * 1024 // 10MB

      if (!acceptedTypes.includes(selectedFile.type)) {
        setErrorText(t.add_profile_photo.error_typy_of_photo)

        return
      }

      if (selectedFile.size > maxSizeBytes) {
        setErrorText(t.add_profile_photo.error_size_photo)

        return
      }

      setProfilePhoto(selectedFile)
      setErrorText(undefined)
    }
  }
  const handleSavePhoto = () => {
    const formData = new FormData()

    if (profilePhoto) {
      formData.append('cover', profilePhoto)
    }
    savePhoto(formData)
    // .unwrap()
    // .catch(err => {
    //
    // })

    closeModal()
    setProfilePhoto(profilePhoto)
  }
  const handleCloseModal = () => {
    closeModal()
    setProfilePhoto(undefined)
  }

  const size = {
    width: 316,
    height: 316,
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

  return (
    <Modal
      open={isOpen}
      size={'md'}
      title={t.add_profile_photo.add_profile_photo_text}
      onClose={handleCloseModal}
    >
      <div>
        <div>
          {profilePhoto ? (
            <>
              <div className={s.cropContainer}>
                <div className={s.profilePhotoBlock}>
                  <Cropper
                    image={URL.createObjectURL(profilePhoto)}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    cropShape="round"
                    showGrid={false}
                    onCropChange={onCropChange}
                    onCropComplete={onCropComplete}
                    onZoomChange={onZoomChange}
                    cropSize={size}
                    {...customStyles}
                  />
                </div>
              </div>
              <div className={s.buttonBox}>
                <Button variant={'primary'} className={s.buttons} onClick={handleSavePhoto}>
                  {t.add_profile_photo.save_button}
                </Button>
              </div>
            </>
          ) : (
            <div className={s.box}>
              {errorText && <div className={s.errorText}>{errorText}</div>}
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
          onChange={onMainFileSelected}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
    </Modal>
  )
}
