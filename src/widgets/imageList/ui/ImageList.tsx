import React, { FC } from 'react'

import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props'

import s from './ImageList.module.scss'

import { ImageCard } from '@/shared/components/imageCard'

type Props = {
  imageList?: string[] | StaticImageData[]
}

export const ImageListWidget: FC<Props> = props => {
  const { imageList } = props

  return (
    <div className={s.container}>
      {imageList?.map((img, index) => <ImageCard key={index} src={img} alt="" />)}
    </div>
  )
}
