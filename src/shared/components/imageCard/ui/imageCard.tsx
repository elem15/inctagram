import React, { FC } from 'react'

import { clsx } from 'clsx'
import Image, { type ImageProps } from 'next/image'

import s from './ImageCard.module.scss'

type Props = ImageProps & {
  cardClassName?: string
}

export const ImageCard: FC<Props> = props => {
  const { src, alt, cardClassName } = props

  return (
    <>
      <Image src={src} className={clsx(s.image, cardClassName)} alt={alt} />
    </>
  )
}
