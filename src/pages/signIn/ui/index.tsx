import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { SignInWidget } from '@/widgets/signIn'

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center bg-dark-700">
      <SignInWidget />
    </div>
  )
}

SignInPage.getLayout = getHeaderLayout

export { SignInPage }
