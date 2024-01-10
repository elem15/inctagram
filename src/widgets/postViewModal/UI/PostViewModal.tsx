import Image from 'next/image'

import s from './PostViewModal.module.scss'

import { useGetSinglePostQuery } from '@/entities/publicPosts'
import { Modal } from '@/shared/components/modals'
import { SwiperSlider } from '@/shared/components/swiperSlider'
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
      <div className={s.imageContainer}>
        {data && data.id === postId && <SwiperSlider imagesUrl={data.images} />}
      </div>
    </Modal>
  )
}
