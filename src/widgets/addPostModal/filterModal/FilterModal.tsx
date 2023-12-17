import React, { FC, useRef, useState } from 'react'

import { clsx } from 'clsx'
import { A11y, EffectCube, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import s from './FilterModal.module.scss'

import './instagram.min.scss'
import 'swiper/scss/effect-cube'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

import { useAppSelector } from '@/app/appStore'
import { updateFilter } from '@/app/services/cropper-slice'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { FiltersInsta } from '@/widgets/addPostModal/filterModal/filtterInctagramTool'
import { NormalFilter } from '@/widgets/addPostModal/filterModal/filtterInctagramTool/NormalFilter'
import { PostModalHeader } from '@/widgets/addPostModal/PostHeaderModal'
import { PublicationModal } from '@/widgets/addPostModal/publicationModal/PublicationModal'

type Props = {
  isOpenFilter: boolean

  closeFilter: () => void
  croppers: any
}

export const FilterModal: FC<Props> = ({ isOpenFilter, croppers, closeFilter }) => {
  const imgResultRefs = useRef(Array.from({ length: croppers.length }, () => null))
  const [filterClass, setFilterClass] = useState<{ [key: number]: string }>({})
  const [filteredImg, setFilteredImg] = useState()
  const imgRefs = useRef(Array.from({ length: croppers.length }, () => null))
  const { isOpen, openModal, closeModal } = useModal()
  const [openPublishModal, setPublishModal] = useState(false)
  const handleOpenNext = () => {
    openModal()
  }

  console.log(croppers, 'cro')
  const handleChangeFilter = (index: number, filterClass: string) => {
    setFilterClass(prevFilterClasses => ({
      ...prevFilterClasses,
      [index]: filterClass,
    }))
  }

  return (
    <>
      <Modal
        open={isOpenFilter}
        size={'lg'}
        title={
          <PostModalHeader
            title={'Filters'}
            closeModal={closeFilter}
            gap={'211%'}
            onNext={handleOpenNext}
          />
        }
        showCloseButton={false}
        isPost={true}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ height: '504px', width: '490px' }}>
            <Swiper
              modules={[Navigation, Pagination, A11y, EffectCube]}
              className={'post-images-slider'}
              pagination={{ clickable: true }}
              effect={'cube'}
              navigation
              cubeEffect={
                {
                  //slideShadows: true,
                }
              }
              grabCursor={true}
            >
              {croppers.map((post, index) => {
                console.log(post)

                return (
                  <SwiperSlide key={index}>
                    <div className={s.box}>
                      <img
                        src={URL.createObjectURL(post)}
                        alt={''}
                        style={{ height: '100%' }}
                        className={clsx(s.postImg && filterClass[index])}
                        ref={el => (imgResultRefs.current[index] = el)}
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
          <div className={s.instaFilter}>
            {croppers.map((_, index) => (
              <NormalFilter
                key={index}
                filterClass={filterClass[index]}
                setFilterClass={filterClass => handleChangeFilter(index, filterClass)}
                photo={croppers[index]}
              />
            ))}
            <FiltersInsta
              filterClass={filterClass[0]}
              setFilterClass={filterClass => handleChangeFilter(0, filterClass)}
              imgRef={el => (imgRefs.current[0] = el)}
              photo={croppers[0]?.imageSrc}
              onFilterComplete={() => {}}
            />
            <PublicationModal isOpen={isOpen} photos={croppers} onPrevStep={closeModal} />
          </div>
        </div>
      </Modal>
    </>
  )
}
