import s from './Delete.module.scss'

import { useDeletePhotoMutation } from '@/entities/profile/api/profileApi'
import { CloseIcon } from '@/shared/assets'
import { Button } from '@/shared/components/button/button'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { useAuth } from '@/shared/lib/hooks/useAuth'

type Props = {
  isOpen: boolean
  closeModal?: () => void
}
export const DeleteProfilePhoto = () => {
  const { t } = useTranslation()
  const { isOpen, openModal, closeModal } = useModal()
  const { accessToken } = useAuth()

  const [deleteAvatar] = useDeletePhotoMutation()
  const handlerDeleteAvatar = () => {
    deleteAvatar({ accessToken })
  }

  return (
    <div>
      <span className={s.deleteButtonBox}>
        <Button variant={'link'} className={s.deleteButton} onClick={openModal}>
          <CloseIcon />
        </Button>
      </span>
      <Modal
        open={isOpen}
        size={'m'}
        title={t.delete_photo_of_profile.title_of_modal}
        onClose={closeModal}
      >
        <span className={s.text}>{t.delete_photo_of_profile.text}</span>
        <div className={s.buttons}>
          <Button variant="outline" className={s.buttonn} onClick={handlerDeleteAvatar}>
            {t.delete_photo_of_profile.button_yes}
          </Button>
          <Button className={s.buttonn}>{t.delete_photo_of_profile.button_no}</Button>
        </div>
      </Modal>
    </div>
  )
}
