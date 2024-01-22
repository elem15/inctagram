import { PostCommentsView } from './PostCommentsView'
import s from './PostViewModal.module.scss'

import { SwiperSlider } from '@/shared/components'

type Props = {
  data: PostDataType
}

export const ModalContentUI = ({ data }: Props) => {
  return (
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
  )
}
