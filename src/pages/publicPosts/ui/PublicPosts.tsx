import { ImageListWidget } from '@/widgets/imageList'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const PublicPosts = () => {
  return (
    <div className=" w-full mx-12 mt-6 mb-12">
      <ImageListWidget />
    </div>
  )
}

PublicPosts.getLayout = getHeaderLayout

export { PublicPosts }
