import { AddPostModal } from '@/widgets/addPostModal/AddPostModal'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'

function Create() {
  return <AddPostModal />
}

Create.getLayout = getHeaderWithSidebarLayout

export { Create }
