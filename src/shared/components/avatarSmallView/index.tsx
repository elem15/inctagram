import { ComponentPropsWithoutRef, ElementType } from 'react'

import Image from 'next/image'

import s from './AvatarSmallView.module.scss'

import SmileImg from '@/shared/assets/SmileImg.png'
import { cn } from '@/shared/lib/utils'

export type AvatarProps<T extends ElementType = 'img'> = {
  avatarOwner?: string
} & ComponentPropsWithoutRef<T>

export const AvatarSmallView = ({ avatarOwner, className }: AvatarProps) => {
  return (
    <Image
      src={avatarOwner || SmileImg}
      width={36}
      height={36}
      alt="Owner's avatar"
      className={cn(s.smallAvatar, className)}
    />
  )
}
