import { useState } from 'react'

import Image from 'next/image'

import { PostCommentsView } from './PostCommentsView'
import { PostEdit } from './PostEdit'
import s from './PostViewModal.module.scss'

import { postsApi, useDeletePostMutation } from '@/entities/posts'
import { publicPostsApi, useGetSinglePostQuery } from '@/entities/publicPosts'
import { Button, SwiperSlider, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch, useErrorHandler, useFetchLoader, useTranslation } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { useAuth } from '@/shared/lib/hooks/useAuth'

type Props = {
  postId: number
  isOpen: boolean
  closeModal: () => void
}

export const PostViewModal = ({ postId, isOpen, closeModal }: Props) => {
  const { data, error, isLoading } = useGetSinglePostQuery(postId)
  const [modalType, setModalType] = useState<'view' | 'edit'>('view')
  const { t } = useTranslation()

  const [deletePost, { isLoading: deleteLoading, error: deleteError }] = useDeletePostMutation()

  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal()

  useFetchLoader(isLoading || deleteLoading)
  useErrorHandler((error || deleteError) as CustomerError)
  const { accessToken } = useAuth()
  const dispatch = useAppDispatch()

  const handleDeletePost = () => {
    deletePost({ postId, accessToken })
      .unwrap()
      .then(async () => {
        await new Promise(res => setTimeout(res, 1000))
        closeModal()
        closeModal()
        dispatch(publicPostsApi.util.resetApiState())
        dispatch(postsApi.util.resetApiState())
      })
  }

  return (
    <Modal
      open={isOpen}
      size={'xl'}
      isHeaderDisabled={modalType === 'view' ? true : false}
      isPost={true}
      title={modalType === 'edit' ? t.post_view.edit : ''}
      onClose={closeModal}
    >
      <Modal open={isDeleteOpen} size={'sm'} title={'Delete Post'} onClose={closeDeleteModal}>
        <Typography variant="regular_text_16">
          Are you sure you want to delete this post?
        </Typography>
        <div className={s.deleteButtons}>
          <Button variant="outline" onClick={handleDeletePost}>
            Yes
          </Button>
          <Button variant="primary" onClick={closeDeleteModal}>
            No
          </Button>
        </div>
      </Modal>

      <div className={s.modalContent}>
        {modalType === 'view' && (
          <>
            <div className={s.imageContainer}>
              {data && data.id === postId && <SwiperSlider imagesUrl={data.images} />}
            </div>
            <div className={s.commentsContainer}>
              {data && (
                <PostCommentsView
                  setModalType={setModalType}
                  ownerId={data.ownerId}
                  avatarOwner={data.avatarOwner}
                  firstName={data.owner.firstName}
                  lastName={data.owner.lastName}
                  description={data.description}
                  updatedAt={data.updatedAt}
                  openDeleteModal={openDeleteModal}
                />
              )}
            </div>
          </>
        )}
        {modalType === 'edit' && (
          <>
            <div>
              {data && data.id === postId && (
                <Image
                  src={data.images[0].url}
                  alt={data.description}
                  width={500}
                  height={621}
                  className={s.singleImage}
                />
              )}
            </div>
            <div className={s.commentsContainer}>
              {data && (
                <PostEdit
                  setModalType={setModalType}
                  ownerId={data.ownerId}
                  avatarOwner={data.avatarOwner}
                  firstName={data.owner.firstName}
                  lastName={data.owner.lastName}
                  description={data.description}
                  postId={data.id}
                  closeModal={closeModal}
                />
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
