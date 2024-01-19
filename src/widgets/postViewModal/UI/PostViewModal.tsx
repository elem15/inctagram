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
  modalId: number
  isOpen: boolean
  closeModal: () => void
}

export const PostViewModal = ({ modalId, isOpen, closeModal }: Props) => {
  const { data, error, isLoading } = useGetSinglePostQuery(modalId)
  const [modalType, setModalType] = useState<'view' | 'edit'>('view')
  const { t } = useTranslation()
  const [isPostEdit, setIsPostEdit] = useState(false)
  const [deletePost, { isLoading: deleteLoading, error: deleteError }] = useDeletePostMutation()

  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal()
  const {
    isOpen: isEditCloseOpen,
    openModal: openEditCloseModal,
    closeModal: closeEditCloseModal,
  } = useModal()

  useFetchLoader(isLoading || deleteLoading)
  useErrorHandler((error || deleteError) as CustomerError)
  const { accessToken } = useAuth()
  const dispatch = useAppDispatch()

  const handleDeletePost = () => {
    deletePost({ postId: modalId, accessToken })
      .unwrap()
      .then(async () => {
        await new Promise(res => setTimeout(res, 1000))
        closeModal()
        dispatch(publicPostsApi.util.resetApiState())
        dispatch(postsApi.util.resetApiState())
      })
  }

  const handleCloseEditConfirmModal = () => {
    setModalType('view')
    closeEditCloseModal()
  }

  return (
    <Modal
      open={isOpen}
      size={'xl'}
      isHeaderDisabled={modalType === 'view'}
      isPost={true}
      title={modalType === 'edit' ? t.post_view.edit : ''}
      onClose={
        // eslint-disable-next-line no-nested-ternary
        modalType === 'edit'
          ? !isPostEdit
            ? openEditCloseModal
            : handleCloseEditConfirmModal
          : closeModal
      }
    >
      <ConfirmModal
        isOpen={isDeleteOpen}
        title={t.post_view.delete}
        confirmMessage={t.post_view.delete_confirm}
        onClose={closeDeleteModal}
        yes={handleDeletePost}
        no={closeDeleteModal}
      />
      <ConfirmModal
        isOpen={isEditCloseOpen}
        title={t.post_view.close_edit_title}
        confirmMessage={t.post_view.close_edit_confirm}
        onClose={handleCloseEditConfirmModal}
        yes={handleCloseEditConfirmModal}
        no={closeEditCloseModal}
      />
      <div className={s.modalContent}>
        {modalType === 'view' && (
          <>
            <div className={s.imageContainer}>
              {data && data.id === modalId && <SwiperSlider imagesUrl={data.images} />}
            </div>
            <div className={s.commentsContainer}>
              {data && (
                <PostCommentsView
                  setModalType={setModalType}
                  ownerId={data.ownerId}
                  avatarOwner={data.avatarOwner}
                  userName={data.userName}
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
              {data && data.id === modalId && (
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
                  isPostEdit={isPostEdit}
                  setIsPostEdit={setIsPostEdit}
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
