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

import { Modal } from '@/shared/components/modals'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { FiltersInsta } from '@/widgets/addPostModal/filterModal/filtterInctagramTool'
import { PostModalHeader } from '@/widgets/addPostModal/PostHeaderModal'
import { PublicationModal } from '@/widgets/addPostModal/publicationModal/PublicationModal'

type Props = {
  isOpenFilter: boolean
  imgPost: any
  closeFilter: () => void
}

export const FilterModal: FC<Props> = ({ isOpenFilter, imgPost, closeFilter }) => {
  const imgResultRef = useRef(null)
  const [filterClass, setFilterClass] = useState('')
  const imgRef = useRef(null)
  const { isOpen, openModal, closeModal } = useModal()

  console.log(imgPost)

  const handleOpenNext = () => {
    openModal()
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
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ height: '504px', width: '490px' }}>
            <Swiper
              modules={[Navigation, Pagination, A11y, EffectCube]}
              className={'post-images-slider'}
              navigation
              pagination={{ clickable: true }}
              effect={'cube'}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              grabCursor={true}
            >
              {imgPost.map((post, index) => {
                console.log(post)

                return (
                  <SwiperSlide key={index}>
                    <div className={s.box}>
                      <img
                        src={URL.createObjectURL(post)}
                        alt={''}
                        className={clsx(s.postImg && filterClass)}
                        ref={imgResultRef}
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
          <PublicationModal isOpen={isOpen} photos={imgPost} onPrevStep={closeModal} />
          <FiltersInsta
            filterClass={filterClass}
            setFilterClass={setFilterClass}
            imgRef={imgRef}
            photo={imgPost}
          />
        </div>
      </Modal>
    </>
  )
}
