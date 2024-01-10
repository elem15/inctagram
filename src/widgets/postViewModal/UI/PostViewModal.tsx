import Image from 'next/image'

import s from './PostViewModal.module.scss'

import { useGetSinglePostQuery } from '@/entities/publicPosts'
import { Modal } from '@/shared/components/modals'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'

type Props = {
  postId: number
  isOpen: boolean
  closeModal: () => void
}

export const PostViewModal = ({ postId, isOpen, closeModal }: Props) => {
  const { data, error, isLoading } = useGetSinglePostQuery(postId)
  const images = data?.images.length ? data.images : []

  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)

  return (
    <Modal open={isOpen} size={'lg'} title={''} onClose={closeModal}>
      <div className={s.imageContainer}>
        {data && data.id === postId && (
          <Image
            src={images[0].url || ''}
            alt={data?.description || ''}
            width={images[0].width}
            height={images[0].height}
          ></Image>
        )}
      </div>
    </Modal>
  )
}
