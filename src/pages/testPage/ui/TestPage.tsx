import { useState } from 'react'

import { Pagination } from '@/shared/components'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const TestPage = () => {
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState<string | number>(1)
  const totalCount = 1000
  const options = [
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '30', value: '30' },
    { label: '40', value: '40' },
    { label: '50', value: '50' },
  ]

  return (
    <div className="flex justify-center items-center bg-dark-700">
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        currentPage={currentPage as number}
        onCurrentPageChange={setCurrentPage}
        options={options}
        portionValue={pageSize.toString()}
      ></Pagination>
    </div>
  )
}

TestPage.getLayout = getHeaderLayout

export { TestPage }
