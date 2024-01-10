import React, { useState } from 'react'

import Image, { type ImageProps } from 'next/image'

import s from './imageCard.module.scss'

import { useFetchLoader } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { PostViewModal } from '@/widgets/postViewModal'

type Props = ImageProps & {
  postId: number
  cardClassName?: string
  openModal: (postId: number) => void
}

export const ImageCard = ({ postId, src, alt, cardClassName, width, height, openModal }: Props) => {
  const [loading, setLoading] = useState(true)

  useFetchLoader(loading)

  return (
    <>
      <div
        className={s.image}
        onClick={() => {
          openModal(postId)
        }}
      >
        <Image
          src={src}
          className={cardClassName}
          alt={alt}
          width={width}
          height={height}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </>
  )
}
