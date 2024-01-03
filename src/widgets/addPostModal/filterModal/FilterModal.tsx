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

  const [openClosCrop, setCloseCrop] = useState(false)
  const dispatch = useAppDispatch()
  const imgRefs = useRef(null)
  const { isOpen, openModal, closeModal } = useModal()
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handleOpenNext = (id:string, ) => {
    dispatch(setImage({ image: croppers }))
      debugger
      console.log({canvasRef})
      // if (canvasRef.current !== null && selectedImageIndex !== null) {
          const context = canvasRef.current.getContext('2d');

          if (context) {
              const selectedImage = croppers[selectedImageIndex];
              const img = new Image();

              img.onload = () => {
                  // Clear previous content on the canvas
                  context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

                  // Apply the new filter
                  context.filter = selectedImage.filterClass;

                  // Draw the image on the canvas with the applied filter
                  context.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);

                  // Convert canvas content to data URL (base64 encoded image)
                  const modifiedImageSrc = canvasRef.current.toDataURL();

                  // Dispatch an action to update the image in your state
                  dispatch(updatePhotos([{ id: selectedImage.id, image: modifiedImageSrc, croppedAreaPixels: selectedImage.croppedAreaPixels }]));
              };

              img.src = selectedImage.image;
          } else {
              console.error('Canvas context is null');
          // }
      }
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
                        <canvas ref={canvasRef} width={500} height={500} style={{ display: 'none' }} />
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
                          // setFilterClass={filterClass => handleChangeFilter(post.id, filterClass)}
                          photo={post.image}
                          idOfImage={post.id}
                        />

                        <FiltersInsta
                          filterClass={post.filterClass}
                          // setFilterClass={filterClass => handleChangeFilter(post.id, filterClass)}
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
