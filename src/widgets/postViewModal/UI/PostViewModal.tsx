import { Modal } from '@/shared/components/modals'

type Props = {
  isOpen: boolean
  closeModal: () => void
}

export const PostViewModal = ({ isOpen, closeModal }: Props) => {
  return (
    <Modal open={isOpen} size={'lg'} title={''} onClose={closeModal}>
      Post
    </Modal>
  )
}
