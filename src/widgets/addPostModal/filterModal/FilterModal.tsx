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
import {
  removeAllPhotos,
  setImage,
  updateFilterClass,
  updatePhotos,
} from '@/app/services/cropper-slice'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { CloseCrop } from '@/widgets/addPostModal/ClickOutSide'
import { FiltersInsta } from '@/widgets/addPostModal/filterModal/filtterInctagramTool'
import { NormalFilter } from '@/widgets/addPostModal/filterModal/filtterInctagramTool/NormalFilter'
import { PostModalHeader } from '@/widgets/addPostModal/PostHeaderModal'
import { PublicationModal } from '@/widgets/addPostModal/publicationModal/PublicationModal'

type Props = {
  isOpenFilter: boolean

  closeFilter: () => void

  closeCroppingModal: () => void
}

export const FilterModal: FC<Props> = ({
  isOpenFilter,
  closeCroppingModal,

  closeFilter,
}) => {
  const croppers = useAppSelector(state => state.croppersSlice)

  // const [filterClass, setFilterClass] = useState<{ [key: number]: string }>({})
  const [filteredImg, setFilteredImg] = useState()
  const [openClosCrop, setCloseCrop] = useState(false)
  const dispatch = useAppDispatch()
  const imgRefs = useRef(null)
  const { isOpen, openModal, closeModal } = useModal()
  const [openPublishModal, setPublishModal] = useState(false)

  const handleOpenNext = () => {
    dispatch(setImage({ image: croppers }))
    openModal()
  }

  const handleChangeFilter = (id: string, filterClass: string) => {
    dispatch(updateFilterClass({ id, filterClass }))
  }

  console.log({ croppers }, ' filterModal')
  const handleDiscard = () => {
    closeFilter()
    setCloseCrop(false)
    closeCroppingModal()
  }
  const handleInteractOutside = (event: FocusEvent | MouseEvent | TouchEvent) => {
    setCloseCrop(true)
  }

  return (
    <div>
      <CloseCrop
        openCloseCrop={openClosCrop}
        closeCrop={() => setCloseCrop(false)}
        onDiscard={handleDiscard}
      />
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
        onInteractOutside={handleInteractOutside}
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
                        alt={''}
                        style={{ height: '100%', minWidth: '490px', border: '2px solid' }}
                        className={clsx(s.postImg && post.filterClass)}
                        ref={imgRefs}
                      />
                      <div className={s.instaFilter}>
                        <NormalFilter
                          filterClass={post.filterClass}
                          setFilterClass={filterClass => handleChangeFilter(post.id, filterClass)}
                          photo={post.image}
                          idOfImage={post.id}
                        />

                        <FiltersInsta
                          filterClass={post.filterClass}
                          setFilterClass={filterClass => handleChangeFilter(post.id, filterClass)}
                          imgRef={imgRefs}
                          photo={post.image}
                          idOfImage={post.id}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
        <PublicationModal
          isOpen={isOpen}
          onPrevStep={closeModal}
          discardAll={handleDiscard}
          photos={croppers}
        />
      </Modal>
    </div>
  )
}
