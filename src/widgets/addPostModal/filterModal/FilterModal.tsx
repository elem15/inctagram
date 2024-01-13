import React, { FC, useRef, useState } from 'react'

import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import s from './FilterModal.module.scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

import { useAppSelector } from '@/app/appStore'
import { Modal } from '@/shared/components/modals'
import { useTranslation } from '@/shared/lib'
import { useSize } from '@/shared/lib/hooks'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { CloseCrop } from '@/widgets/addPostModal/CloseCrop'
import { FiltersTool } from '@/widgets/addPostModal/filterModal/filtterInctagramTool/FiltersTool'
import { PublicationModal } from '@/widgets/addPostModal/publicationModal/PublicationModal'

type Props = {
  isOpenFilter: boolean

  closeFilter: () => void
  setImageScr: (img: string | null) => void
  closeCroppingModal: () => void
}

export const FilterModal: FC<Props> = ({
  isOpenFilter,
  closeCroppingModal,
  setImageScr,
  closeFilter,
}) => {
  const croppers = useAppSelector(state => state.croppersSlice)
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [openClosCrop, setCloseCrop] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const { isOpen, openModal, closeModal } = useModal()
  const { t } = useTranslation()
  const handleOpenNext = async () => {
    openModal()
  }
  const handleSlideChange = (swiper: any) => {
    setCurrentPostIndex(swiper.activeIndex)
  }
  const handleDiscard = () => {
    closeFilter()
    setCloseCrop(false)
    closeCroppingModal()
  }
  const handleInteractOutside = (event: Event) => {
    setCloseCrop(true)
  }
  const handleSaveFilterPost = () => {
    handleDiscard()
  }

  return (
    <div>
      <CloseCrop
        openCloseCrop={openClosCrop}
        closeCrop={() => setCloseCrop(false)}
        onDiscard={() => setCloseCrop(false)}
        savePhotoInDraft={handleSaveFilterPost}
      />
      <Modal
        open={isOpenFilter}
        size={'lg'}
        isCropHeader={true}
        onClickNext={handleOpenNext}
        closePostModal={closeFilter}
        title={t.post.filter_modal}
        showCloseButton={false}
        isPost={true}
        onInteractOutside={handleInteractOutside}
        buttonText={t.post.button_navigation_text}
      >
        <div className={s.filterBox}>
          <div className={s.swiperSlideBox}>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              className={'post-images-slider'}
              pagination={{ clickable: true }}
              navigation
              grabCursor={true}
              onSlideChange={handleSlideChange}
            >
              {croppers.map(post => {
                return (
                  <SwiperSlide key={post.id}>
                    <div className={s.box}>
                      <img
                        src={post.image}
                        alt={''}
                        style={{
                          filter: post.filterClass,
                        }}
                        className={s.postImg}
                        ref={imageRef}
                      />
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>

          <FiltersTool
            photo={croppers[currentPostIndex]?.image}
            idOfImage={croppers[currentPostIndex]?.id}
          />
        </div>

        <PublicationModal
          isOpen={isOpen}
          onPrevStep={closeModal}
          discardAll={handleDiscard}
          photos={croppers}
          setImageScr={setImageScr}
        />
      </Modal>
    </div>
  )
}
