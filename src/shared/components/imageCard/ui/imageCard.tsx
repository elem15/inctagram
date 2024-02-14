/* eslint-disable prettier/prettier */
import React, { useState } from 'react'

import Image, { type ImageProps } from 'next/image'

import s from './imageCard.module.scss'

import { useFetchLoader } from '@/shared/lib'

type Props = ImageProps & {
  postId: number
  cardClassName?: string
  openModal?: (postId: number) => void
}

export const ImageCard = ({ postId, src, alt, cardClassName, width, height, openModal }: Props) => {
  const [loading, setLoading] = useState(true)

  useFetchLoader(loading)

  return (
    <>
      <div
        className={s.image}
        style={{ position: 'relative' }}
        onClick={
          openModal
            ? () => {
              openModal(postId)
            }
            : () => null
        }
      >
        <Image
          src={src}
          style={{ objectFit: 'contain' }}
          className={cardClassName}
          sizes='50vw'
          fill
          priority
          alt={alt}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </>
  )
}
