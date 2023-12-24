import React, { FC, useRef, useState } from 'react'

import { clsx } from 'clsx'
import Image from 'next/image'
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
import { updateFilterClass } from '@/app/services/cropper-slice'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { FiltersInsta } from '@/widgets/addPostModal/filterModal/filtterInctagramTool'
import { NormalFilter } from '@/widgets/addPostModal/filterModal/filtterInctagramTool/NormalFilter'
import { PostModalHeader } from '@/widgets/addPostModal/PostHeaderModal'
import { PublicationModal } from '@/widgets/addPostModal/publicationModal/PublicationModal'

import { use } from 'ast-types'

type Props = {
  isOpenFilter: boolean

  closeFilter: () => void
  croppers: any
}

export const FilterModal: FC<Props> = ({ isOpenFilter, croppers, closeFilter }) => {
  const imgResultRefs = useRef(Array.from({ length: croppers.length }, () => null))
  const filterClass = useAppSelector(state => state.croppersSlice.filterClass)
  // const [filterClass, setFilterClass] = useState<{ [key: number]: string }>({})
  const [filteredImg, setFilteredImg] = useState()
  const dispatch = useAppDispatch()
  const imgRefs = useRef(null)
  const { isOpen, openModal, closeModal } = useModal()
  const [openPublishModal, setPublishModal] = useState(false)
  const handleOpenNext = () => {
    openModal()
  }

  const handleChangeFilter = (filterClass: string) => {
    dispatch(updateFilterClass(filterClass))
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
              {croppers.map(post => {
                return (
                  <SwiperSlide key={post.id}>
                    <div className={s.box}>
                      <Image
                        src={post.image}
                        width={500}
                        height={500}
                        // src={URL.createObjectURL(post)}
                        alt={''}
                        style={{ height: '100%', width: '500px', border: '2px solid' }}
                        className={clsx(s.postImg && filterClass)}
                        ref={imgRefs}
                      />
                      <div className={s.instaFilter}>
                        <NormalFilter
                          filterClass={filterClass}
                          setFilterClass={filterClass => handleChangeFilter(filterClass)}
                          photo={post.image}
                        />

                        <FiltersInsta
                          filterClass={filterClass}
                          setFilterClass={filterClass => handleChangeFilter(filterClass)}
                          imgRef={imgRefs}
                          photo={post.image}
                        />
                        <PublicationModal isOpen={isOpen} photos={croppers} onPrevStep={closeModal} />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>

        </div>
      </Modal>
    </>
  )
}
