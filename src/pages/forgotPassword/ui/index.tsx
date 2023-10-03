import { FC } from 'react'

import { ForgotPasswordWidget } from '@/widgets/forgotPassword'

export const ForgotPasswordPage: FC = () => {
  return (
    <div className="flex justify-center min-h-screen items-center bg-dark-700">
      <ForgotPasswordWidget />
    </div>
  )
}
