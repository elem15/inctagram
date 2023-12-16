import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import { AddPostModal } from '@/widgets/addPostModal/AddPostModal'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'

function Create() {
  const { isOpen, closeModal, openModal } = useModal()

  return <AddPostModal isPostOpen={isOpen} />
}

Create.getLayout = getHeaderWithSidebarLayout

export { Create }
