/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props'
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

  const loadNextPosts = () => {
    images && setPostId(images.at(-1)?.id)
  }

  useEffect(() => {
    const imagesData = data ? (data as PostDataToComponent[]) : []

    setImages(prev => [...prev, ...imagesData])
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

  return (
    <div className={s.container}>
      <button onClick={loadNextPosts}>next</button>
      {images?.map(({ id, url, description, width, height }) => (
        <ImageCard key={id} src={url} alt={description} width={width} height={height} />
      ))}
    </div>
  )
}
