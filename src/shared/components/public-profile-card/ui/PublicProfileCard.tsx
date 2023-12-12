import { FC, useEffect, useRef, useState } from 'react'

import Image, { StaticImageData } from 'next/image'

import s from './PublicProfileCard.module.scss'

import { Typography } from '@/shared/components'
import { CustomSlider } from '@/shared/components/custom-slider'
import { ExpandableText } from '@/shared/components/expandable-text'

export type PublicProfileCardProps = {
  mainImage: StaticImageData
  description: string
  imagesUrl: any
}

export const PublicProfileCard: FC<PublicProfileCardProps> = ({
  mainImage,
  imagesUrl,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent): void => {
      !menuRef.current?.contains(e.target as Node) && setIsExpanded(false)
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [isExpanded])

  return (
    <div className={s.container}>
      <CustomSlider>
        {imagesUrl?.map((image: any, index: number) => {
          return <Image key={index} src={image.url} alt={''} />
        })}
      </CustomSlider>
      <div className={s.wrapper} ref={menuRef}>
        <div className={s.sticky}>
          <div className={s.mainInfo}>
            <Image src={mainImage} className={s.profileImg} alt={''} />
            <Typography className={s.profileName} variant="bold_text_16">
              URLProfiele
            </Typography>
          </div>
          <Typography className={s.timeInfo} variant="semi-bold_small_text">
            22 min ago
          </Typography>
          <div className={s.description}>
            <ExpandableText
              descriptionLength={100}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            >
              {description}
            </ExpandableText>
          </div>
        </div>
      </div>
    </div>
  )
}
