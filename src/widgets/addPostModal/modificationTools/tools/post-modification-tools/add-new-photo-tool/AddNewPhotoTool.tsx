import React, { FC, useState } from 'react'

import { clsx } from 'clsx'
import { A11y, Scrollbar, Thumbs } from 'swiper/modules'
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
  deletePhoto: (i: number) => void
}
export const AddNewPhotoTool: FC<Props> = ({ selectNewPhoto, photos, deletePhoto }) => {
  const [open, setOpen] = useState(true)
  const newPhotoTrigger = (
    <div className={s.tool}>
      <DefaultProfileImg style={{ width: '24px', height: '24px' }} />
    </div>
  )
  const handleSelect = (event: Event) => {
    event.preventDefault()
  }
  const countSwiper = photos.length < 2 ? 1 : 2
  const handleDeletePhoto = (index: any) => {
    console.log('delete')
    debugger
    deletePhoto(index)
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
          className={clsx(photos.length < 2 ? `${s.oneSlide} ${s.newItem}` : s.newItem)}
          onSelect={handleSelect}
          onClick={event => event.preventDefault()}
        >
          <div className={clsx(photos.length < 2 ? `${s.oneImg} ${s.imgs}` : s.imgs)}>
            <Swiper
              modules={[Scrollbar]}
              spaceBetween={1}
              slidesPerView={countSwiper}
              scrollbar={{ draggable: true }}
            >
              {photos?.map((photo, index) => {
                console.log(photo)
                console.log(index)

                return (
                  <SwiperSlide key={index}>
                    <div className={s.imgs}>
                      <img src={photo.imageSrc} alt={''} />
                      <div onClick={() => handleDeletePhoto(index)}>
                        <DeleteIcon
                          style={{
                            position: 'absolute',
                            top: '3%',
                            backgroundColor: '#171717',
                            opacity: '0.8',
                            left: '80%',
                          }}
                        />
                      </div>
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
