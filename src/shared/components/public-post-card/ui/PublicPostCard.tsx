import { FC, useEffect, useRef, useState } from 'react'

import { StaticImageData, StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import s from './PublicPostCard.module.scss'

import SmileImg from '@/shared/assets/SmileImg.png'
import { Typography } from '@/shared/components'
import { CustomSlider } from '@/shared/components/custom-slider'
import { ExpandableText } from '@/shared/components/expandable-text'

export const PublicPostCard: FC<PublicPostCardProps> = ({
  profileImage,
  imagesUrl,
  description,
  firstName,
  lastName,
  updatedAt,
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
          return <Image key={index} width={234} height={240} src={image.url} alt={''} />
        })}
      </CustomSlider>
      <div className={s.wrapper} ref={menuRef}>
        <div className={s.sticky}>
          <div className={s.mainInfo}>
            {profileImage ? (
              <Image src={profileImage} className={s.profileImg} width={0} height={0} alt={''} />
            ) : (
              <Image src={SmileImg} className={s.profileImg} width={234} height={240} alt={''} />
            )}
            {firstName && (
              <Typography className={s.profileName} variant="bold_text_16">
                {`${firstName} ${lastName}`}
              </Typography>
            )}
          </div>
          {/* <Typography className={s.timeInfo} variant="semi-bold_small_text">
            {updatedAt}
          </Typography> */}
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
