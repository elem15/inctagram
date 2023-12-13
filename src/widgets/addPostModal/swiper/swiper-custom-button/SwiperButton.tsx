import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef, ReactNode } from 'react'

import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {
  children: ReactNode
  spaceBetween?: number
  slidesPerView?: number
  slide: any[]
} & ComponentPropsWithoutRef<typeof Swiper>
export const SwiperCustom = ({ children, slidesPerView = 1, slide }: Props) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={50}
      slidesPerView={slidesPerView}
      className={'post-images-filter'}
      navigation
      pagination={{ clickable: true }}
    >
      {slide?.map((s, index) => {
        return <SwiperSlide key={index}>{children}</SwiperSlide>
      })}
    </Swiper>
  )
}
export const SwiperSlideCustom: FC<Props> = ({ children }) => {
  return <SwiperSlide>{children}</SwiperSlide>
}
