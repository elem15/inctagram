import React, { FC, useEffect } from 'react'

import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props'

import s from './ImageList.module.scss'

import { useGetPostsQuery } from '@/entities/posts'
import { ImageCard } from '@/shared/components/imageCard'
import { useAuth } from '@/shared/lib/hooks/useAuth'

type Props = {
  imageList?: string[] | StaticImageData[]
}

export const ImageListWidget: FC<Props> = props => {
  const { imageList } = props
  const { accessToken } = useAuth()
  const {
    data,
    isError: isErrorCountriesData,
    isLoading: isLoadingCountries,
    refetch,
  } = useGetPostsQuery({ accessToken })

  return (
    <div className={s.container}>
      <div>{data ? JSON.stringify(data) : null}</div>
      <button onClick={refetch}>fetch</button>

      {imageList?.map((img, index) => <ImageCard key={index} src={img} alt="" />)}
    </div>
  )
}
