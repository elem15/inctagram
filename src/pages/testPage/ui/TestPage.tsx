import { useState } from 'react'

import { DateRange } from 'react-day-picker'

import { Textarea } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { useTranslation } from '@/shared/lib'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const TestPage = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const [date, setResultDate] = useState<Date | DateRange>()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col justify-start items-start bg-dark-700">
      <Textarea value={'content'} />
      <hr />
      <div>{date?.toLocaleString()}</div>
      <br />
      <DatePicker
        mode="single"
        errorMessage={errorMessage}
        setResultDate={setResultDate}
        lang={t.lg}
      />
    </div>
  )
}

TestPage.getLayout = getHeaderLayout

export { TestPage }
