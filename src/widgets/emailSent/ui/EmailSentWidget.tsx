import React, { FC } from 'react'

import { EmailSent } from '@/shared/ui/emailSent/ui/EmailSent'

export const EmailSentWidget: FC = () => {
  return (
    <>
      <EmailSent path="/signup" />
    </>
  )
}
