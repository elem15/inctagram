import { useState } from 'react'

import Image from 'next/image'

import { PostCommentsView } from './PostCommentsView'
import { PostEdit } from './PostEdit'
import s from './PostViewModal.module.scss'

import { postsApi, useDeletePostMutation } from '@/entities/posts'
import { publicPostsApi, useGetSinglePostQuery } from '@/entities/publicPosts'
import { SwiperSlider } from '@/shared/components'
import { ConfirmModal, Modal } from '@/shared/components/modals'
import { useAppDispatch, useErrorHandler, useFetchLoader, useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { useAuth } from '@/shared/lib/hooks/useAuth'

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
