import s from './MyProfile.module.scss'

import { ImageListWidget } from '@/widgets/imageList'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

function MyProfile() {
  return (
    <div className={s.container}>
      <ProfileHeaderWeb />
      <ImageListWidget />
    </div>
  )
}

MyProfile.getLayout = getHeaderWithSidebarLayout

export { MyProfile }
