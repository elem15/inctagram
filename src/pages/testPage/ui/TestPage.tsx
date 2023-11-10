import { useState } from 'react'

import { DateRange } from 'react-day-picker'

import { Textarea } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { useTranslation } from '@/shared/lib'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { ProfileSettings } from '@/widgets/profileSettings/ProfileSettings'

const TestPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const getDate = (date: Date | DateRange) => {
    setErrorMessage('')

    return date
  }
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-start items-start bg-dark-700">
      <Textarea value={'content'} />
      <hr />
      <br />
      <DatePicker mode="range" errorMessage={errorMessage} getDate={getDate} lang={t.lg} />
      <ProfileSettings></ProfileSettings>
    </div>
  )
}

TestPage.getLayout = getHeaderLayout

export { TestPage }
