import { Typography } from '@/shared/components'
import { DataOfFollowers } from '@/shared/components/followers-modal/dataOfFollowers/DataOfFollowers'
import { Modal } from '@/shared/components/modals'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'

export const ModalOfFollowers = () => {
  const { isOpen, openModal, closeModal } = useModal()

  return (
    <>
      <Typography variant={'regular_text_14'} onClick={openModal} style={{ cursor: 'pointer' }}>
        Followers
      </Typography>

      <Modal
        open={isOpen}
        size={'l'}
        showCloseButton={true}
        title={`500 ${'Followers'}`}
        onClose={closeModal}
      >
        <DataOfFollowers />
      </Modal>
    </>
  )
}
