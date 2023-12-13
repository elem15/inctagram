import React, { FC, useState } from 'react'

import { clsx } from 'clsx'
import { A11y, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import s from './AddNewPhotoTool.module.scss'

import 'swiper/scss/scrollbar'
import { DefaultProfileImg, IconAdd } from '@/shared/assets'
import { DeleteIcon } from '@/shared/assets/icons/DeleteIcon'
import { CustomDropdown, CustomDropdownItem } from '@/shared/components'

type Props = {
  selectNewPhoto: () => void
  photos: { imageSrc: string | null }[]
}
export const AddNewPhotoTool: FC<Props> = ({ selectNewPhoto, photos }) => {
  const [open, setOpen] = useState(true)
  const newPhotoTrigger = (
    <div className={s.tool}>
      <DefaultProfileImg style={{ width: '24px', height: '24px' }} />
    </div>
  )
  const handleSelect = (event: Event) => {
    event.preventDefault()
  }

  return (
    <div>
      <CustomDropdown
        trigger={newPhotoTrigger}
        align={'end'}
        side={'top'}
        className={s.box}
        isArrow={false}
        sideOffset={2}
        stayOpen={true}
      >
        <CustomDropdownItem
          className={s.newItem}
          onSelect={handleSelect}
          onClick={event => event.preventDefault()}
        >
          <div className={s.imgs}>
            <Swiper
              modules={[Scrollbar, A11y]}
              spaceBetween={1}
              slidesPerView={2}
              scrollbar={{ draggable: true }}
            >
              {photos?.map((photo, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div key={index} className={s.imgs}>
                      <img src={photo.imageSrc} alt={''} />
                      <DeleteIcon
                        style={{
                          position: 'absolute',
                          top: '12%',
                          backgroundColor: '#171717',
                          opacity: '0.8',
                          left: '50%',
                        }}
                        on
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
          <div style={{ display: 'flex', alignItems: 'start', height: '100%' }}>
            <IconAdd style={{ width: '36px', height: '36px' }} onClick={() => selectNewPhoto()} />
          </div>
        </CustomDropdownItem>
      </CustomDropdown>
    </div>
  )
}
