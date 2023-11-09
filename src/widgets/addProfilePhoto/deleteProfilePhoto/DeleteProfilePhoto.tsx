import { Button } from '@storybook/components'

import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'

type Props = {
  isOpen: boolean
  closeModal?: () => void
}
export const DeleteProfilePhoto = ({ isOpen, closeModal }: Props) => {
  const { t } = useTranslation()

  return (
    <div>
      <Modal
        open={isOpen}
        size={'m'}
        title={t.delete_photo_of_profile.title_of_modal}
        onClose={closeModal}
      >
        <span>{t.delete_photo_of_profile.text}</span>
        <div>
          <Button>{t.delete_photo_of_profile.button_yes}</Button>
          <Button>{t.delete_photo_of_profile.button_no}</Button>
        </div>
      </Modal>
    </div>
  )
}
