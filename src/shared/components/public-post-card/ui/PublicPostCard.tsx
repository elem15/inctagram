import { FC, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import ReactTimeAgo from 'react-time-ago'
import { Navigation, Pagination, Scrollbar, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import s from './PublicPostCard.module.scss'

import ArrowLeft from '@/shared/assets/icons/ArrowLeft'
import ArrowRight from '@/shared/assets/icons/ArrowRight'
import SmileImg from '@/shared/assets/SmileImg.png'
import { Typography } from '@/shared/components'
import { CustomSlider } from '@/shared/components/custom-slider'
import { ExpandableText } from '@/shared/components/expandable-text'
import { useTranslation } from '@/shared/lib'

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

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
  const { t } = useTranslation()
  const swiperNavPrevRef = useRef(null)
  const swiperNavNextRef = useRef(null)

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
      <Swiper
        modules={[Navigation, Pagination, Scrollbar]}
        navigation={{
          prevEl: swiperNavPrevRef.current,
          nextEl: swiperNavNextRef.current,
        }}
        effect={'fade'}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
      >
        {imagesUrl?.map((image: any, index: number) => {
          return (
            <SwiperSlide key={index} className={s.item}>
              <Image
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                priority
                fill
                sizes="(min-width: 1280px) 360px, (max-width: 1280px) 240px"
                src={SmileImg}
                alt={''}
              />
            </SwiperSlide>
          )
        })}
        <div className={s.swiperNavPrev} ref={swiperNavPrevRef}>
          <ArrowLeft />
        </div>
        <div className={s.swiperNavNext} ref={swiperNavNextRef}>
          <ArrowRight />
        </div>
      </Swiper>
      {/* <CustomSlider>
        {imagesUrl?.map((image: any, index: number) => {
          return (
            <Image
              key={index}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              priority
              fill
              sizes="(min-width: 1280px) 360px, (max-width: 1280px) 240px"
              src={image.url}
              alt={''}
            />
          )
        })}
      </CustomSlider> */}
      <div className={s.wrapper} ref={menuRef}>
        <div className={s.sticky}>
          <div className={s.mainInfo}>
            {profileImage ? (
              <Image
                src={profileImage}
                priority
                className={s.profileImg}
                width={0}
                height={0}
                alt={''}
              />
            ) : (
              <Image src={SmileImg} className={s.profileImg} width={234} height={240} alt={''} />
            )}
            {firstName && (
              <Typography className={s.profileName} variant="bold_text_16">
                {`${firstName} ${lastName}`}
              </Typography>
            )}
          </div>
          <Typography className={s.timeInfo} variant="semi-bold_small_text">
            <ReactTimeAgo date={Date.parse(updatedAt)} locale={t.lg} />
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
