import { ForgotPasswordWidget } from '@/widgets/forgotPassword'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const ForgotPasswordPage = () => {
  return (
    <div className="flex justify-center  items-center bg-dark-700 mt-18">
      <ForgotPasswordWidget />
    </div>
  )
}

ForgotPasswordPage.getLayout = getHeaderLayout

export { ForgotPasswordPage }
