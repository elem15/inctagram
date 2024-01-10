import React, { useState } from 'react'

import Image, { type ImageProps } from 'next/image'

import s from './imageCard.module.scss'

import { useFetchLoader } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { PostViewModal } from '@/widgets/postViewModal'

type Props = ImageProps & {
  cardClassName?: string
}

export const ImageCard = ({ src, alt, cardClassName, width, height }: Props) => {
  const [loading, setLoading] = useState(true)
  const { isOpen, openModal, closeModal } = useModal()

  useFetchLoader(loading)

  return (
    <>
      <div className={s.image} onClick={openModal}>
        <Image
          src={src}
          className={cardClassName}
          alt={alt}
          width={width}
          height={height}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <PostViewModal isOpen={isOpen} closeModal={closeModal} />
    </>
  )
}
