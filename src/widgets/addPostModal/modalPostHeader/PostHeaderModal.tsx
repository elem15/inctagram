import React, { CSSProperties } from 'react'

import s from './PostHeaderModal.module.scss'

import { IconLeft } from '@/shared/assets/icons/LeftIcon'
import { Button, Typography } from '@/shared/components'
type Props = {
  closeModal?: () => void
  title?: string
  className?: string
  style?: CSSProperties
  gap?: string
  onNext?: () => void
  buttonText?: string
  disableButton?: any
}
export const PostModalHeader = ({
  closeModal,
  title,
  style,
  className,
  gap,
  onNext,
  buttonText,
  disableButton,
}: Props) => {
  return (
    <header style={{ ...style, display: 'flex', alignItems: 'center', gap: gap }} className={s.box}>
      <Button variant={'link'} onClick={closeModal}>
        <IconLeft />
      </Button>
      <Typography variant={'h1'}>{title}</Typography>
      <Button
        variant={'link'}
        style={{ fontSize: '16px' }}
        onClick={onNext}
        disabled={disableButton}
      >
        {buttonText}
      </Button>
    </header>
  )
}
