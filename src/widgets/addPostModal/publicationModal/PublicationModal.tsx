import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { A11y, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import s from './PublicationModal.module.scss'

import { setAlert } from '@/app/services'
import { CropperState, removeAllPhotos, updatePhotos } from '@/app/services/cropper-slice'
import { setTextOfTextarea } from '@/app/services/post-slice'
import {
  postsApi,
  usePublishPostsImageMutation,
  usePublishPostsMutation,
} from '@/entities/posts/api/postsApi'
import { useGetProfileQuery } from '@/entities/profile'
import { Input, Textarea, Typography } from '@/shared/components'
import { Modal } from '@/shared/components/modals'
import { useAppDispatch, useAppSelector, useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { CloseCrop } from '@/widgets/addPostModal/CloseCrop'
import { createImage } from '@/widgets/addProfilePhoto/addAvaWithoutRotation/crropUtils'

import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

type Props = {
  isOpen: boolean
  photos: CropperState[]
  onPrevStep: () => void
  discardAll: () => void
  setImageScr: (img: string | null) => void
}
export const PublicationModal: FC<Props> = ({
  isOpen,
  photos,
  setImageScr,
  onPrevStep,
  discardAll,
}) => {
  const { userId, accessToken } = useAuth()
  const [openCloseModal, setCloseModal] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const text = useAppSelector(state => state.postSlice.textOfTextarea)
  const { data: profileData } = useGetProfileQuery({ profileId: +userId, accessToken })
  const [publishDescription, { isLoading: isPostLoading, isSuccess }] = usePublishPostsMutation()
  const [publishPostImage, { isLoading }] = usePublishPostsImageMutation()
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    dispatch(setTextOfTextarea(value))

    setWordCount(value.length)
  }

  const downloadNewPosts = () => {
    new Promise(res => setTimeout(res, 2000)).then(() => {
      onPrevStep()
      dispatch(removeAllPhotos())
      setImageScr(null)
      dispatch(postsApi.util.resetApiState())
      discardAll()
    })
  }

  useFetchLoader(isPostLoading)

  const handlePublish = async () => {
    const croppedImages = await Promise.all(
      photos.map(async cropper => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const modifiedImage = await createImage(cropper.image)

        canvas.width = modifiedImage.width
        canvas.height = modifiedImage.height

        ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height)

        if (ctx) ctx.filter = cropper.filterClass

        ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height)

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

    await publishPostImage({ postsPhoto: croppedImages, accessToken })
      .unwrap()
      .then(res => {
        const images = res.images as PostImageDTO[]
        const childrenMetadata = images.map(i => ({ uploadId: i.uploadId }))

        publishDescription({
          description: text,
          childrenMetadata,
          accessToken,
        })
      })
      .then(() => {
        downloadNewPosts()
      })
      .catch(error => {
        dispatch(setAlert({ variant: 'error', message: error }))
      })
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
        onDiscard={() => setCloseModal(false)}
        savePhotoInDraft={handleDiscard}
      />
      {/*<Modal*/}
      {/*  open={isOpen}*/}
      {/*  size={windowSize[0] == 768 ? 'md' : 'lg'}*/}
      {/*  isCropHeader={true}*/}
      {/*  onClickNext={handlePublish}*/}
      {/*  closePostModal={onPrevStep}*/}
      {/*  buttonText={t.post.publish_button}*/}
      {/*  title={t.post.publication_modal}*/}
      {/*  showCloseButton={false}*/}
      {/*  isPost={true}*/}
      {/*  onInteractOutside={handleInteractOutPublishModal}*/}
      {/*  disableButton={isLoading || isPostLoading}*/}
      {/*>*/}
      <div className={s.modBox}>
        <div className={s.imageContainer}>
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
                      <img src={photo.image} style={{ filter: photo.filterClass }} alt={''} />
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
              {profileData?.avatars[0] && (
                <img src={profileData.avatars[0].url} className={s.avatar} alt={'postImg'} />
              )}
              <Typography variant={'h3'}>{profileData?.userName}</Typography>
            </div>

            <Textarea
              label={t.post.label_of_textarea}
              style={{ height: '80px', resize: 'none' }}
              placeholder={t.post.placeholder_of_textarea}
              onChange={handleChangeText}
              className={s.textArea}
              maxLength={500}
            />
            <Typography variant={'small_text'} style={{ textAlign: 'end', color: '#8d9094' }}>
              {wordCount}/500
            </Typography>
          </div>
          <div className={s.locationBox}>
            <Input
              label={t.post.label_of_input}
              type={`location`}
              style={{ border: '1px solid #4C4C4C', background: 'transparent' }}
            />
          </div>
        </div>
      </div>
      {/*</Modal>*/}
    </>
  )
}
