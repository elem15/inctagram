import s from './MyProfile.module.scss'

import PersonImg from '@/shared/assets/PersonImg1.png'
import { ImageListWidget } from '@/widgets/imageList'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { ProfileHeaderMob, ProfileHeaderWeb } from '@/widgets/profileHeader'

function MyProfile() {
  const imageList = [PersonImg, PersonImg, PersonImg, PersonImg, PersonImg, PersonImg]

  return (
    <div className={s.container}>
      <ProfileHeaderWeb />
      <ProfileHeaderMob />
      <ImageListWidget imageList={imageList} />
    </div>
  )
}

MyProfile.getLayout = getHeaderWithSidebarLayout

export { MyProfile }
