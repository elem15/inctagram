import { SuperCheckbox, Textarea } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { CalendarButton } from '@/shared/components/ui'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const TestPage = () => {
  return (
    <div className="flex flex-col justify-start items-start bg-dark-700">
      <SuperCheckbox />
      <Textarea />
      <hr />
      <CalendarButton variant={'destructive'}>Button</CalendarButton>
      <br />
      <DatePicker mode="range" errorMessage="Error!" />
    </div>
  )
}

TestPage.getLayout = getHeaderLayout

export { TestPage }
