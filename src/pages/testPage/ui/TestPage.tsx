import { SuperCheckbox } from '@/shared/components'
import { DatePicker } from '@/shared/components/datePicker'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const TestPage = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-dark-700">
      <SuperCheckbox />
      <hr />
      <br />
      <DatePicker mode="single" />
    </div>
  )
}

TestPage.getLayout = getHeaderLayout

export { TestPage }
