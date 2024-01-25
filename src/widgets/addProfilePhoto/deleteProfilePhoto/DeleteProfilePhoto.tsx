import { useState } from 'react'

import s from './Delete.module.scss'

import { useDeletePhotoMutation } from '@/entities/profile/api/profileApi'
import { DeleteIcon } from '@/shared/assets/icons/DeleteIcon'
import { Typography } from '@/shared/components'
import { Button } from '@/shared/components/button/button'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { useAuth } from '@/shared/lib/hooks/useAuth'

export const DeleteProfilePhoto = () => {
  const { t } = useTranslation()
  const { isOpen, openModal, closeModal } = useModal()
  const { accessToken } = useAuth()
  const [buttonDisables, setDisabled] = useState(false)
  const [deleteAvatar, { isSuccess }] = useDeletePhotoMutation()
  const handlerDeleteAvatar = () => {
    setDisabled(true)
    deleteAvatar({ body: null, accessToken })
    closeModal()
    if (isSuccess) setDisabled(false)
  }

  return (
    <div>
      <Typography variant={'small_link'} onClick={openModal}>
        <DeleteIcon
          style={{
            backgroundColor: '#cc1439',
            borderRadius: '50%',
            width: '14x',
            height: '14px',
            padding: '1px',
          }}
        />
      </Typography>

      <Modal
        open={isOpen}
        size={'m'}
        title={t.delete_photo_of_profile.title_of_modal}
        onClose={closeModal}
      >
        <span className={s.text}>{t.delete_photo_of_profile.text}</span>
        <div className={s.buttons}>
          <Button
            variant="outline"
            className={s.buttonn}
            onClick={handlerDeleteAvatar}
            disabled={buttonDisables}
          >
            {t.delete_photo_of_profile.button_yes}
          </Button>
          <Button className={s.buttonn} onClick={closeModal}>
            {t.delete_photo_of_profile.button_no}
          </Button>
        </div>
      </Modal>
    </div>
  )
}
