import { ChangeEvent, useRef, useState } from 'react'

import Cropper from 'react-easy-crop'

import s from './ProfilePhoto.module.scss'

import { DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { Alert } from '@/shared/components/alert'
import { Modal } from '@/shared/components/modals'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
type Props = {
  photo: string
}

export const ProfilePhoto = ({ photo }: Props) => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <div>
      <div className={s.userPhotoBlock}>
        {photo ? (
          <img
            alt={'ava'}
            src={photo}
            style={{ borderRadius: '50%', height: '12rem', width: '12rem' }}
          />
        ) : (
          <DefaultProfileImg style={{ width: '3rem', height: '3rem' }} />
        )}
      </div>
      <Button variant={'outline'} onClick={openModal}>
        Add a Profile Photo
      </Button>

      <AddProfilePhotoModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  )
}
type Propss = {
  isOpen: boolean
  closeModal: () => void
}
const AddProfilePhotoModal = ({ isOpen, closeModal }: Propss) => {
  const [profilePhoto, setProfilePhoto] = useState<Blob | undefined>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

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

      if (acceptedTypes.includes(selectedFile.type) && selectedFile.size <= maxSizeBytes) {
        setProfilePhoto(selectedFile)
      } else {
        console.log('error')
      }
    }
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
    <Modal open={isOpen} size={'md'} title={'Add a Profile Photo'} onClose={handleCloseModal}>
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
                <Button variant={'primary'} className={s.buttons}>
                  Save
                </Button>
              </div>
            </>
          ) : (
            <div className={s.box}>
              <div className={s.errorText}>{text}</div>
              <div className={s.defaultProfilePhotoBlock}>
                <DefaultProfileImg style={{ width: '3rem', height: '3rem' }} />
              </div>

              <Button variant={'primary'} className={s.buttonPhoto} onClick={selectPhotoHandler}>
                Select from Computer
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
