import { useState } from 'react'

import { DateRange } from 'react-day-picker'

import { SuperCheckbox, Textarea } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { CalendarButton } from '@/shared/components/ui'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const TestPage = () => {
  const [errorMessage, setErrorMessage] = useState('Error')
  const getDate = (date: Date | DateRange) => {
    console.log(date)
    setErrorMessage('')

    return date
  }

  return (
    <div className="flex flex-col justify-start items-start bg-dark-700">
      <SuperCheckbox />
      <Textarea value={'content'}/>
      <hr />
      <CalendarButton variant={'destructive'}>Button</CalendarButton>
      <br />
      <DatePicker mode="single" errorMessage={errorMessage} getDate={getDate} />
    </div>
  )
}

TestPage.getLayout = getHeaderLayout

export { TestPage }
