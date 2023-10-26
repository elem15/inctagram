import { CreateNewPasswordWidget } from '@/widgets/createNewPassword'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const CreateNewPasswordPage = () => {
  return (
    <div className="flex justify-center  items-center bg-dark-700">
      <CreateNewPasswordWidget />
    </div>
  )
}

CreateNewPasswordPage.getLayout = getHeaderLayout

export { CreateNewPasswordPage }
