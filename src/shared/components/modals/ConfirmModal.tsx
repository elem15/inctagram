import { Button, Typography } from '..'

import s from './ConfirmModal.module.scss'

import { Modal } from '.'

import { useTranslation } from '@/shared/lib'

type Props = {
  isOpen: boolean
  title: string
  confirmMessage: string
  onClose: () => void
  yes: () => void
  no: () => void
}
export const ConfirmModal = ({ isOpen, title, onClose, yes, no, confirmMessage }: Props) => {
  const { t } = useTranslation()

  return (
    <Modal open={isOpen} size={'sm'} title={title} onClose={onClose}>
      <Typography variant="regular_text_16">{confirmMessage}</Typography>
      <div className={s.deleteButtons}>
        <Button variant="outline" onClick={yes}>
          {t.logout.yes}
        </Button>
        <Button variant="primary" onClick={no}>
          {t.logout.no}
        </Button>
      </div>
    </Modal>
  )
}
