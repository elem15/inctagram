/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'

import s from './ImageList.module.scss'

import { useGetPostsQuery } from '@/entities/posts'
import { ImageCard } from '@/shared/components/imageCard'
import { useErrorHandler, useFetchLoader } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'

export const ImageListWidget = () => {
  const [postId, setPostId] = useState<number>()
  const [images, setImages] = useState<PostDataToComponent[]>([])
  const { userId } = useAuth()
  const { data, isLoading, error } = useGetPostsQuery({ userId, postId })
  const ref = useRef(null)

  useEffect(() => {
    const imagesData = data ? (data as PostDataToComponent[]) : []
    const index = images.findIndex(image => image.id === imagesData[0]?.id)

    setImages(prev => {
      return index === -1 ? [...prev, ...imagesData] : prev
    })
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
      observer && observer?.disconnect()
    }
  }, [images])

  return (
    <>
      <div className={s.container}>
        {images?.map(({ id, url, description, width, height }) => (
          <ImageCard key={id} src={url} alt={description} width={width} height={height} />
        ))}
      </div>
      <div ref={ref} style={{ visibility: 'hidden' }}>
        __________________
      </div>
    </>
  )
}
