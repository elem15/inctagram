import React from 'react'

import { EmailSentWidget } from '@/widgets/emailSent'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const index = () => {
  return <EmailSentWidget />
}

index.getLayout = getHeaderLayout

export default index
