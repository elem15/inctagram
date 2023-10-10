import { FC, useEffect } from 'react'

import { redirect } from 'next/navigation'

import { useAppSelector } from '@/shared/model'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { SignUpWidget } from '@/widgets/signUp'

const SignUpPage = () => {
  const { statusCode, isLoading, error } = useAppSelector(state => state.user)

  return (
    <div className="flex justify-center items-center bg-dark-700">
      {isLoading && <div className="bg-white">Loading...</div>}
      {error && <div className="bg-white">Error: {error}</div>}

      <SignUpWidget />
    </div>
  )
}

SignUpPage.getLayout = getHeaderLayout

export { SignUpPage }
