import s from './DeleteFollowing.module.scss'

import { Button, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
type Props = {
  avatar: string
}
export const DeleteFollowing = ({ avatar }: Props) => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Button variant={'link'} style={{ color: '#fff' }} onClick={openModal}>
        Delete
      </Button>

      <Modal open={isOpen} size={'sm'} title={''}>
        <div style={{ backgroundImage: avatar ? `${avatar}` : 'none' }}>{}</div>
        <Typography></Typography>
        <div className={s.buttonBox}>
          <Button variant={'outline'}>Yes</Button>
          <Button variant={'primary'}>No</Button>
        </div>
      </Modal>
    </>
  )
}
