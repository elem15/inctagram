/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import s from './ImageList.module.scss'

import { useGetPostsQuery } from '@/entities/posts'
import { ImageCard } from '@/shared/components/imageCard'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { PostViewModal } from '@/widgets/postViewModal'

type Props = { userId: number }

export const ImageListWidget = ({ userId }: Props) => {
  const [postId, setPostId] = useState<number>()
  const [images, setImages] = useState<PostDataToComponent[]>([])
  const ref = useRef(null)
  const { data, isLoading, error } = useGetPostsQuery({ userId, postId })
  const { isOpen, openModal, closeModal, modalId } = useModal()
  const searchParams = useSearchParams()

  const postNumber = searchParams?.get('postId') as string | undefined

  useEffect(() => {
    postNumber && openModal(+postNumber)
  }, [postNumber])

  useEffect(() => {
    const imagesData: PostDataToComponent[] = data ?? []
    const index = images.findIndex(image => image.id === imagesData[0]?.id)

    if (!data) {
      setImages([])
    }
    //if add new post
    else if (images.length && images[0]?.id < imagesData[0]?.id) {
      setImages(data)
    } else {
      setImages(prev => {
        return index === -1 ? [...prev, ...imagesData] : prev
      })
    }
  }, [data])
  useFetchLoader(isLoading)
  useErrorHandler(error as CustomerError)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPostId(images.at(-1)?.id)
        }
      },
      { rootMargin: '0px' }
    )

    ref?.current && observer.observe(ref.current)

    return () => {
      observer && observer.disconnect()
    }
  }, [images])

  return (
    <>
      <div className={s.container}>
        {!!images &&
          images.length > 0 &&
          images.map(({ id, url, description, width, height }) => (
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
      <div ref={ref} style={{ visibility: 'hidden' }}>
        __________________
      </div>
      {!!modalId && <PostViewModal postId={modalId} isOpen={isOpen} closeModal={closeModal} />}
    </>
  )
}
