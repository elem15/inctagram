import { FC, useEffect } from 'react'

import { redirect } from 'next/navigation'
import { useRouter } from 'next/router'

import { useAppSelector } from '@/shared/model'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { SignUpWidget } from '@/widgets/signUp'

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center bg-dark-700">
      <SignUpWidget />
    </div>
  )
}

SignUpPage.getLayout = getHeaderLayout

export { SignUpPage }
