import React, { FC, useRef, useState } from 'react'

import { clsx } from 'clsx'
import { A11y, EffectCube, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/scss'
import s from './FilterModal.module.scss'
import 'swiper/scss/effect-cube'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

import { useAppSelector } from '@/app/appStore'
import { updatePhotos } from '@/app/services/cropper-slice'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch } from '@/shared/lib'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { CloseCrop } from '@/widgets/addPostModal/ClickOutSide'
import { FiltersTool } from '@/widgets/addPostModal/filterModal/filtterInctagramTool/FilttersTool'
import { PostModalHeader } from '@/widgets/addPostModal/PostHeaderModal'
import { PublicationModal } from '@/widgets/addPostModal/publicationModal/PublicationModal'
import { createImage } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/crropUtils'

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

  const [openClosCrop, setCloseCrop] = useState(false)
  const dispatch = useAppDispatch()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const { isOpen, openModal, closeModal } = useModal()
  const handleOpenNext = async () => {
    const croppedImages = await Promise.all(
      croppers.map(async cropper => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const modifiedImage = await createImage(cropper.image)

        canvas.width = modifiedImage.width
        canvas.height = modifiedImage.height

        ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height)

        ctx.filter = cropper.filterClass

        ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height)

        ctx.filter = 'none'

        const newImage = new Image()

        newImage.src = canvas.toDataURL()

        const base64Data = canvas.toDataURL('image/jpeg')

        return {
          id: cropper.id,
          image: base64Data,
          croppedAreaPixels: cropper.croppedAreaPixels,
        }
      })
    )

    dispatch(updatePhotos(croppedImages))
    openModal()
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
                      <img
                        src={post.image}
                        width={500}
                        height={500}
                        alt={''}
                        style={{
                          height: '100%',
                          minWidth: '490px',
                          filter: post.filterClass,
                        }}
                        className={clsx(s.postImg)}
                        ref={imageRef}
                      />
                      <div className={s.instaFilter}>
                        <FiltersTool photo={post.image} idOfImage={post.id} />
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
