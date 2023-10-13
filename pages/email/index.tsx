import React from 'react'

import { EmailSentWidget } from '@/widgets/emailSent'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'


const index = () => {
  return (
    <div className="flex justify-center min-h-screen items-center bg-dark-700">
      <EmailSentWidget />
    </div>
  )
}
index.getLayout = getHeaderLayout


export default index
