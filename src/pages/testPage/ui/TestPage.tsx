import { SuperCheckbox } from '@/shared/components'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const TestPage = () => {
  return (
    <div className="flex justify-center items-center bg-dark-700">
      <SuperCheckbox />
    </div>
  )
}

TestPage.getLayout = getHeaderLayout

export { TestPage }
