import React, { ChangeEvent, FC, useState } from 'react'

import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './PublicationModal.module.scss'

import { removeAllPhotos } from '@/app/services/cropper-slice'
import { setTextOfTextarea } from '@/app/services/post-slice'
import {
  usePublishPostsImageMutation,
  usePublishPostsMutation,
} from '@/entities/posts/api/postsApi'
import { useGetProfileQuery } from '@/entities/profile'
import { Input, Textarea, Typography } from '@/shared/components'
import 'swiper/scss/effect-cube'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { CloseCrop } from '@/widgets/addPostModal/ClickOutSide'
import { PostModalHeader } from '@/widgets/addPostModal/PostHeaderModal'

type Props = {
  isOpen: boolean
  photos: any
  onPrevStep: () => void
  discardAll: () => void
}
export const PublicationModal: FC<Props> = ({ isOpen, photos, onPrevStep, discardAll }) => {
  const { userId, accessToken } = useAuth()
  const [openCloseModal, setCloseModal] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const dispatch = useAppDispatch()
  //const photos = useAppSelector(state => state.croppersSlice)

  const text = useAppSelector(state => state.postSlice.textOfTextarea)
  const { data: profileData } = useGetProfileQuery({
    profileId: userId,
    accessToken,
  } as UserAuthData)
  const [publishDescription] = usePublishPostsMutation()
  const [publishPostImage, { error, isLoading }] = usePublishPostsImageMutation()

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    dispatch(setTextOfTextarea(value))

    setWordCount(value.length)
  }

  console.log({ userId })
  const handlePublish = () => {
    // try {
    debugger
    publishPostImage({ postsPhoto: photos, accessToken }).unwrap()

    // publishDescription({ description: text, childrenMetadata: [{ uploadId: userId }], accessToken })
    // } catch (error) {
    console.error('Error publishing post:', error)
    discardAll()
    onPrevStep()
    dispatch(removeAllPhotos())
  }
  const handleInteractOutPublishModal = () => {
    setCloseModal(true)
  }
  const handleDiscard = () => {
    setCloseModal(false)
    discardAll()
  }

  return (
    <>
      <CloseCrop
        openCloseCrop={openCloseModal}
        closeCrop={() => setCloseModal(false)}
        onDiscard={handleDiscard}
      />
      <Modal
        open={isOpen}
        size={'lg'}
        title={
          <PostModalHeader
            title={'Publication'}
            closeModal={onPrevStep}
            gap={'137%'}
            isPublish={true}
            onNext={handlePublish}
          />
        }
        showCloseButton={false}
        isPost={true}
        onInteractOutside={handleInteractOutPublishModal}
      >
        <div style={{ width: '100%', display: 'flex', height: '31.5rem' }}>
          <div style={{ width: '50%' }}>
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              className={'post-images-slider'}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={10}
              slidesPerView={1}
            >
              <div>
                {photos.map(photo => {
                  return (
                    <SwiperSlide key={photo.id} className={s.swiper}>
                      <div className={s.imageBox}>
                        <img src={photo.image} className={photo.filterClass} alt={''} />
                      </div>
                    </SwiperSlide>
                  )
                })}
              </div>
            </Swiper>
          </div>
          <div className={s.dataBox}>
            <div className={s.textareaBox}>
              <div className={s.avaAndUserName}>
                <img src={profileData?.avatars[0]?.url} className={s.avatar} />
                <Typography variant={'h3'}>{profileData?.userName}</Typography>
              </div>

              <Textarea
                label={'Add publication descriptions'}
                style={{ height: '120px', resize: 'none' }}
                placeholder={'Add your description'}
                onChange={handleChangeText}
                disabled={wordCount === 500}
              />
              <Typography variant={'small_text'} style={{ textAlign: 'end', color: '#8d9094' }}>
                {wordCount}/500
              </Typography>
            </div>
            <div className={s.locationBox}>
              <Input
                label={'Add location'}
                type={'location'}
                style={{ border: '1px solid #4C4C4C', background: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
