import React, { useEffect } from 'react'

import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props'

import s from './ImageList.module.scss'

import { useGetPostsQuery } from '@/entities/posts'
import { ImageCard } from '@/shared/components/imageCard'
import { useAuth } from '@/shared/lib/hooks/useAuth'

export const ImageListWidget = () => {
  const { accessToken } = useAuth()
  const { data, isError, isLoading } = useGetPostsQuery({ accessToken })
  const images = data as PostDataToComponent[]

  console.log(images)

  return (
    <div className={s.container}>
      {images?.map(({ id, url, description, width, height }) => (
        <ImageCard key={id} src={url} alt={description} width={width} height={height} />
      ))}
    </div>
  )
}
