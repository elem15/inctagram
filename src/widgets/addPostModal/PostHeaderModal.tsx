import React, { CSSProperties } from 'react'

import { IconLeft } from '@/shared/assets/icons/LeftIcon'
import { Button, Typography } from '@/shared/components'
type Props = {
  closeModal: () => void
  title: string
  className?: string
  style?: CSSProperties
  gap?: string
  onNext: () => void
  isPublish?: boolean
}
export const PostModalHeader = ({
  closeModal,
  title,
  style,
  className,
  gap,
  onNext,
  isPublish = false,
}: Props) => {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: gap, ...style }}
      className={className}
    >
      <Button variant={'link'} onClick={closeModal}>
        <IconLeft />
      </Button>
      <Typography variant={'h1'}>{title}</Typography>
      <Button variant={'link'} style={{ fontSize: '16px' }} onClick={onNext}>
        {isPublish ? 'Publish' : 'Next'}
      </Button>
    </div>
  )
}
