import React, { useState } from 'react'

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
    <div className={s.image}>
      <Image
        src={src}
        className={cardClassName}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  )
}
