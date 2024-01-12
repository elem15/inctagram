import { PostCommentsView } from './PostCommentsView'
import s from './PostViewModal.module.scss'

import { useGetSinglePostQuery } from '@/entities/publicPosts'
import { SwiperSlider } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'

type Props = {
  postId: number
  isOpen: boolean
  closeModal: () => void
}

export const PostViewModal = ({ postId, isOpen, closeModal }: Props) => {
  const { data, error, isLoading } = useGetSinglePostQuery(postId)

  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)

  return (
    <Modal open={isOpen} size={'lg'} title={''} onClose={closeModal}>
      <div className={s.modalContent}>
        <div className={s.imageContainer}>
          {data && data.id === postId && <SwiperSlider imagesUrl={data.images} />}
        </div>
        <div className={s.commentsContainer}>
          {data && (
            <PostCommentsView
              ownerId={data.ownerId}
              avatarOwner={data.avatarOwner}
              firstName={data.owner.firstName}
              lastName={data.owner.lastName}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}
