import { useState } from 'react'

import { DateRange } from 'react-day-picker'

import { SuperCheckbox, Textarea } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { CalendarButton } from '@/shared/components/ui'
import { useTranslation } from '@/shared/lib'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const TestPage = () => {
  const [errorMessage, setErrorMessage] = useState('Error')
  const getDate = (date: Date | DateRange) => {
    setErrorMessage('')

    return date
  }
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-start items-start bg-dark-700">
      <SuperCheckbox />
      <Textarea value={'content'} />
      <hr />
      <CalendarButton variant={'destructive'}>Button</CalendarButton>
      <br />
      <DatePicker mode="range" errorMessage={errorMessage} getDate={getDate} lang={t.lg} />
    </div>
  )
}

TestPage.getLayout = getHeaderLayout

export { TestPage }
