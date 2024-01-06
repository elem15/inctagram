import React, { ChangeEvent, FC, useState } from 'react'

import { useRouter } from 'next/router'

import s from './AddPostPageMob.module.scss'

import { addNewPhoto } from '@/app/services/cropper-slice'
import { Button } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch, useTranslation } from '@/shared/lib'
import {
  readFile,
  useErrorText,
  useGeneralInputRefForPost,
} from '@/widgets/addPostModal/AddPostModal'
type Props = {
  closePostModal: () => void
  openPostModal: boolean
}

export const AddPostPageMob: FC<Props> = ({ closePostModal, openPostModal }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  const router = useRouter()
  const { t } = useTranslation()

  const { inputRef, selectPhotoHandler } = useGeneralInputRefForPost()
  const { errorText, showErrorText } = useErrorText()
  const handleOpenCrop = () => {
    selectPhotoHandler()
  }
  const addNewCropper = (image: string) => {
    dispatch(addNewPhoto(image))
  }
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    debugger
    if (e.currentTarget.files && e.currentTarget.files.length > 0) {
      const file = e.currentTarget.files[0]
      const acceptedTypes = ['image/jpeg', 'image/png']
      const maxSizeBytes = 20 * 1024 * 1024

      if (!acceptedTypes.includes(file.type)) {
        showErrorText(t.add_profile_photo.error_type_of_photo)

        return
      }

      if (file.size > maxSizeBytes) {
        showErrorText(t.add_profile_photo.error_size_photo)

        return
      }
      let imageDataUrl: any = await readFile(file)

      setImageSrc(imageDataUrl)
      closePostModal()
      router.push(`/create`)
      addNewCropper(imageDataUrl)
    }
  }

  return (
    <div className={s.box}>
      <Modal size={`xs`} title={'Add photo'} open={openPostModal} onClose={closePostModal}>
        <>
          <div style={{ display: `flex`, flexDirection: `column`, gap: `24px` }}>
            {errorText && (
              <div className={s.errorBox}>
                <strong>{t.add_profile_photo.error}</strong>
                {errorText}
              </div>
            )}
            <Button variant={`primary`} onClick={handleOpenCrop}>
              Select
            </Button>
            <Button variant={`outline`}>Open Draft</Button>
            <input
              accept={'image/jpeg, image/png'}
              onChange={onFileChange}
              ref={inputRef}
              style={{ display: 'none' }}
              type={'file'}
              multiple
            />
          </div>
        </>
      </Modal>
    </div>
  )
}
