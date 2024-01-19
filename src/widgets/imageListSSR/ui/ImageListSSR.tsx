/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

import s from '../../imageList/ui/ImageList.module.scss'

import { ImageCard } from '@/shared/components/imageCard'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { PostViewModal } from '@/widgets/postViewModal'

type Props = { posts: PostDataToComponent[] }

export const ImageListWidgetSSR = ({ posts }: Props) => {
  const { isOpen, openModal, closeModal, modalId } = useModal()
  const searchParams = useSearchParams()

  const postNumber = searchParams?.get('modalId') as string | undefined

  useEffect(() => {
    postNumber && openModal(+postNumber)
  }, [postNumber])

  return (
    <>
      <div className={s.container}>
        {!!posts &&
          posts.length > 0 &&
          posts.map(({ id, url, description, width, height }) => (
            <ImageCard
              key={id}
              postId={id}
              src={url}
              alt={description}
              width={width}
              height={height}
              openModal={openModal}
            />
          ))}
      </div>
      {!!modalId && <PostViewModal modalId={modalId} isOpen={isOpen} closeModal={closeModal} />}
    </>
  )
}
