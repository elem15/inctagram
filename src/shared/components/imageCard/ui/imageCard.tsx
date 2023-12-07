import React from 'react'

import { clsx } from 'clsx'
import Image, { type ImageProps } from 'next/image'

import s from './imageCard.module.scss'

type Props = ImageProps & {
  cardClassName?: string
}

export const ImageCard = ({ src, alt, cardClassName, width, height }: Props) => {
  return (
    <>
      <Image
        src={src}
        className={clsx(s.image, cardClassName)}
        alt={alt}
        width={width}
        height={height}
      />
    </>
  )
}
