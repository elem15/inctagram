import Image from 'next/image'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './SwiperSlider.module.css'
import './SwiperSlider.css'

import 'swiper/css'
import { cn } from '@/shared/lib/utils'

type Props = {
  imagesUrl: ImagesUrlData[]
}

export const SwiperSlider = ({ imagesUrl }: Props) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      className={cn('post-images-slider', s.slider)}
    >
      {imagesUrl?.map((image: any, index: number) => {
        return (
          <SwiperSlide key={index} className={s.item}>
            <Image
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              priority
              fill
              sizes="(min-width: 1280px) 360px, (max-width: 1280px) 240px"
              src={image.url}
              alt={''}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
