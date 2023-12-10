import React, { useState } from 'react'

import { clsx } from 'clsx'
import Image, { type ImageProps } from 'next/image'

import s from './imageCard.module.scss'

import { useFetchLoader } from '@/shared/lib'

type Props = ImageProps & {
  cardClassName?: string
}

export const ImageCard = ({ src, alt, cardClassName, width, height }: Props) => {
  const [loading, setLoading] = useState(true)

  useFetchLoader(loading)

  return (
    <>
      <Image
        src={src}
        className={clsx(s.image, cardClassName)}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={() => setLoading(false)}
      />
    </>
  )
}
