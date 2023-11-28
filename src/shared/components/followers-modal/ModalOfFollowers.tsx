import s from './ModalOfFollowers.module.scss'

import { Typography } from '@/shared/components'
import { DataOfFollowers } from '@/shared/components/followers-modal/dataOfFollowers/DataOfFollowers'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
export const ModalOfFollowers = () => {
  const { isOpen, openModal, closeModal } = useModal()
  const { t } = useTranslation()

  return (
    <>
      <Typography
        variant={'regular_text_14'}
        className={s.infoText}
        onClick={openModal}
        style={{ cursor: 'pointer' }}
      >
        {t.followers_modal.modals_title}
      </Typography>

      <Modal
        open={isOpen}
        size={'l'}
        showCloseButton={true}
        title={`500 ${t.followers_modal.modals_title}`}
        onClose={closeModal}
      >
        <DataOfFollowers />
      </Modal>
    </>
  )
}
