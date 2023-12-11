import { FC, useEffect, useRef, useState } from 'react'

import Image, { StaticImageData } from 'next/image'

import { CustomSlider } from '../components/CustomSlider'
import images from '../data/images'

import s from './PublicProfileCardsList.module.scss'

import { Typography } from '@/shared/components'

export type PublicProfileProps = {
  children: string
  descriptionLength?: number
  isExpanded: boolean
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const ExpandableText: FC<PublicProfileProps> = ({
  children,
  descriptionLength,
  setIsExpanded,
  isExpanded,
}) => {
  const fullText = children

  const toggleText = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <p className={s.text}>
      {isExpanded ? fullText : `${fullText?.slice(0, descriptionLength)}...`}
      <span onClick={toggleText} className={s.toggleButton}>
        {isExpanded ? 'Hide' : 'Show more'}
      </span>
    </p>
  )
}

export type PublicProfileCardProps = {
  mainImage: StaticImageData
  description: string
  imagesUrl: any
}

const PublicProfileCard: FC<PublicProfileCardProps> = ({ mainImage, imagesUrl, description }) => {
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

export const PublicProfileCardsList = () => {
  return (
    <div className=" max-sm:flex max-sm:gap-x-1 max-sm:flex-col  max-sm: items-center max-sm:justify-center sm:flex sm:w-full gap-x-3  justify-center">
      {Array.from(Array(10).keys()).map((i, key) => {
        return (
          images[i] && (
            <PublicProfileCard
              key={key}
              mainImage={images[i].mainImgURL}
              imagesUrl={images[i].imgURL}
              description={images[i].description}
            />
          )
        )
      })}
    </div>
  )
}
