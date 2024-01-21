import { PostCommentsView } from './PostCommentsView'
import s from './PostViewModal.module.scss'

import { SwiperSlider } from '@/shared/components'
import { Modal } from '@/shared/components/modals'

type Props = {
  isOpen: boolean
  closeModal: () => void
  data?: PostDataType
}

export const PostViewModalSSR = ({ isOpen, closeModal, data }: Props) => {
  return (
    <Modal open={isOpen} size={'xl'} isHeaderDisabled isPost={true} onClose={closeModal}>
      <div className={s.modalContent}>
        <div className={s.imageContainer}>{data && <SwiperSlider imagesUrl={data.images} />}</div>
        <div className={s.commentsContainer}>
          {data && (
            <PostCommentsView
              setModalType={() => ({})}
              ownerId={data.ownerId}
              avatarOwner={data.avatarOwner}
              userName={data.userName}
              description={data.description}
              updatedAt={data.updatedAt}
              openDeleteModal={() => ({})}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}
