/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import s from './ImageList.module.scss'

import { setAlert } from '@/app/services'
import { useGetPostsQuery } from '@/entities/posts'
import { ImageCard } from '@/shared/components/imageCard'
import { useAppDispatch, useFetchLoader, useTranslation } from '@/shared/lib'

export const ImageListWidget = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [postId, setPostId] = useState<number>()
  const { data, isError, isLoading, error } = useGetPostsQuery({ postId })
  const [images, setImages] = useState<PostDataToComponent[]>([])
  const ref = useRef(null)

  useEffect(() => {
    const imagesData = data ? (data as PostDataToComponent[]) : []
    const index = images.findIndex(image => image.id === imagesData[0]?.id)

    setImages(prev => {
      return index === -1 ? [...prev, ...imagesData] : prev
    })
  }, [data])

  useFetchLoader(isLoading)

  useEffect(() => {
    if (isError) {
      const e = error as CustomerError

      if (e.status === 401) {
        dispatch(setAlert({ message: t.profile.auth_error, variant: 'error' }))
        router.push('/signin')
      } else {
        dispatch(setAlert({ message: t.profile.server_error, variant: 'error' }))
        console.error(e)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
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
