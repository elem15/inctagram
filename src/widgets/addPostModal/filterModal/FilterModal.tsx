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
import { NormalFilter } from '@/widgets/addPostModal/filterModal/filtterInctagramTool/NormalFilter'
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
  const [filteredImg, setFilteredImg] = useState()

  const imgRef = useRef(null)
  const { isOpen, openModal, closeModal } = useModal()
  const [openPublishModal, setPublishModal] = useState(false)

  console.log(filteredImg)

  const handleOpenNext = () => {
    openModal()
  }
  const handleFilterComplete = async filteredImage => {
    const img = await setFilteredImg(filteredImage)
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
              {imgPost.map((post, index) => {
                console.log(post)

                return (
                  <SwiperSlide key={index}>
                    <div className={s.box}>
                      <img
                        src={URL.createObjectURL(post)}
                        alt={''}
                        style={{ height: '100%' }}
                        className={clsx(s.postImg && filterClass)}
                        ref={imgResultRef}
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
          <div className={s.instaFilter}>
            <NormalFilter
              filterClass={filterClass}
              setFilterClass={setFilterClass}
              photo={imgPost}
            />
            <FiltersInsta
              filterClass={filterClass}
              setFilterClass={setFilterClass}
              imgRef={imgRef}
              photo={imgPost}
              onFilterComplete={filteredImage => handleFilterComplete(filteredImage)}
            />
            <PublicationModal isOpen={isOpen} photos={imgPost} onPrevStep={closeModal} />
          </div>
        </div>
      </Modal>
    </>
  )
}
