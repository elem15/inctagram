import { useGeneralInputRefForPost } from '@/widgets/addPostModal/AddPostModal'
import { AddPostModalData } from '@/widgets/addPostModal/addPostModalData'
import { AddPostModalDataMob } from '@/widgets/addPostPageMob'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'

const Create = () => {
  const { selectPhotoHandler } = useGeneralInputRefForPost()

  return (
    <div>
      <AddPostModalDataMob selectPhoto={selectPhotoHandler} />
    </div>
  )
}

Create.getLayout = getHeaderWithSidebarLayout

export { Create }
