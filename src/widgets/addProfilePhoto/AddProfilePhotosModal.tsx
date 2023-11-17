import React, { ChangeEvent, useCallback, useRef, useState } from 'react'

import { getOrientation } from 'get-orientation/browser'
import Avatar from 'react-avatar-edit'
import Cropper from 'react-easy-crop'

import s from './AddProfilePhotoModal.module.scss'

import { useSavePhotoMutation } from '@/entities/profile/api/profileApi'
import { DefaultProfileImg } from '@/shared/assets'
import { Button } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'

const MAX_SIZE = 10 * 1024 * 1024
const PROFILE_PHOTO_SIZE = 316

type Propss = {
  isOpen: boolean
  closeModal: () => void
}
export const AddProfilePhotoModal = ({ isOpen, closeModal }: Propss) => {
  const [profilePhoto, setProfilePhoto] = useState<File | undefined>()
  const inputRef = useRef<HTMLInputElement>(null)

  const [errorText, setErrorText] = useState<string | undefined>()
  const { t } = useTranslation()
  const { accessToken } = useAuth()

  const [savePhoto, { data }] = useSavePhotoMutation()
  const EditorRef = useRef(null)

  const convertDataUrlToFile = (dataUrl: string, fileName: string): File => {
    const base64String = dataUrl.split(',')[1]
    const byteCharacters = atob(base64String)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const fileType = dataUrl.split(',')[0].split(':')[1].split(';')[0]

    return new File([byteArray], fileName, { type: fileType })
  }

  const onCrop = (view: string) => {
    const file = convertDataUrlToFile(view, 'hello.txt')

    setProfilePhoto(file)
  }

  const selectPhotoHandler = () => {
    inputRef && inputRef.current?.click()
  }
  let text
  const onMainFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.currentTarget.files?.[0]

    if (selectedFile) {
      const acceptedTypes = ['image/jpeg', 'image/png']

      if (!acceptedTypes.includes(selectedFile.type)) {
        setErrorText(t.add_profile_photo.error_typy_of_photo)

        return
      }

      if (selectedFile.size > MAX_SIZE) {
        setErrorText(t.add_profile_photo.error_size_photo)

        return
      }

      setProfilePhoto(selectedFile)
      setErrorText(undefined)
    }
  }
  const handleSavePhoto = () => {
    if (profilePhoto) {
      savePhoto({ profilePhoto, accessToken })
    }

    // .unwrap()
    // .catch(err => {
    //
    // })

    closeModal()
    setProfilePhoto(undefined)
  }
  const handleCloseModal = () => {
    closeModal()
    setProfilePhoto(undefined)
  }

  return (
    <Modal
      open={isOpen}
      size={'md'}
      title={t.add_profile_photo.add_profile_photo_text}
      onClose={handleCloseModal}
    >
      <div>
        <div className={s.cropContainer}>
          <div className={s.profilePhotoBlock}>
            <Avatar
              ref={EditorRef}
              width={332}
              height={340}
              onBeforeFileLoad={onMainFileSelected}
              onCrop={onCrop}
              imageHeight={300}
              imageWidth={350}
              cropColor={'#171717'}
              shadingColor={'#171717'}
              cropRadius={70}
              // src={profilePhoto ? URL.createObjectURL(profilePhoto) : undefined}
            />
          </div>
        </div>

        <div className={s.buttonBox}>
          <Button variant={'primary'} className={s.buttons} onClick={handleSavePhoto}>
            {t.add_profile_photo.save_button}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
