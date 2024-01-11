import Image from 'next/image'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './SwiperSlider.module.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../../assets/swiperStyle/post-images-slider.scss'
import './SwiperSlider.css'

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
      className={'post-images-slider'}
      style={{ height: '100%', width: '100%' }}
    >
      {imagesUrl?.map((image: any, index: number) => {
        return (
          <SwiperSlide key={index}>
            <Image style={{ objectFit: 'cover' }} priority fill src={image.url} alt={''} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}
