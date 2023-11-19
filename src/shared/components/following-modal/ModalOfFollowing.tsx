import { InputField } from '@/shared'
import { Input } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'

export const ModalOfFollowing = () => {
  const { t } = useTranslation()

  return (
    <Modal open={true} size={'l'} showCloseButton={true} title={'Following'}>
      <>
        <Input type={'search'} placeholder={t.followingsModal.input_placeholder} />
      </>
    </Modal>
  )
}
