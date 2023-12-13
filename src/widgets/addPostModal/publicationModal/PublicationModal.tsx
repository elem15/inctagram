import React, { FC } from 'react'

import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './PublicationModal.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { InputField } from '@/shared'
import { Input, Textarea, Typography } from '@/shared/components'
import 'swiper/scss/effect-cube'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

import { Modal } from '@/shared/components/modals'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { PostModalHeader } from '@/widgets/addPostModal/PostHeaderModal'
type Props = {
  isOpen: boolean
  photos: any
  onPrevStep: () => void
}
export const PublicationModal: FC<Props> = ({ isOpen, photos, onPrevStep }) => {
  const { userId, accessToken } = useAuth()
  const { data: profileData } = useGetProfileQuery({
    profileId: userId,
    accessToken,
  } as UserAuthData)
  const handlePublish = () => {}

  console.log(profileData)

  return (
    <>
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
              <div style={{}}>
                {photos.map((photo, index) => {
                  return (
                    <SwiperSlide key={index} className={s.swiper}>
                      <div className={s.imageBox}>
                        <img src={URL.createObjectURL(photo)} alt={''} />
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
                <img src={profileData?.avatars[0].url} className={s.avatar} />
                <Typography variant={'h3'}>{profileData?.userName}</Typography>
              </div>

              <Textarea
                label={'Add publication descriptions'}
                style={{ height: '120px' }}
                placeholder={'Add your description'}
              />
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
