import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Pagination } from './pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta

export const Defalut = {
  render: () => {
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
      <Pagination
        totalCount={totalCount}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        currentPage={currentPage as number}
        onCurrentPageChange={setCurrentPage}
        options={options}
        portionValue={pageSize.toString()}
      ></Pagination>
    )
  },
}
