import { clsx } from 'clsx'

import ArrowRight from '../../assets/icons//ArrowRight'
import ArrowLeft from '../../assets/icons/ArrowLeft'
import { OptionsType, SelectCustom } from '../select'

import s from './pagination.module.scss'

export type PaginationProps = {
  totalCount: number | undefined
  currentPage: number
  pageSize: number
  onPageSizeChange: (value: number) => void
  onCurrentPageChange: (page: number | string) => void
  siblingCount?: number | string
  options: OptionsType[]
  portionValue: string
}

const DOTS = '...'

const renderPageNumbers = (
  siblingCount: string | number,
  currentPage: number,
  pagesCount: number
): (number | string)[] => {
  const pageNumbers: (number | string)[] = []

  const leftSiblingCount = Math.min(+siblingCount, currentPage - 1)
  const rightSiblingCount = Math.min(+siblingCount, pagesCount - currentPage)

  const rangeStart = currentPage - leftSiblingCount
  const rangeEnd =
    currentPage <= 4 ? currentPage + (5 - currentPage) : currentPage + rightSiblingCount

  if (rangeStart > 1) {
    pageNumbers.push(1)
    if (rangeStart > 2) {
      pageNumbers.push(DOTS)
    }
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    if (i > 0 && i <= pagesCount) {
      pageNumbers.push(i)
    }
  }

  if (rangeEnd < pagesCount) {
    if (rangeEnd < pagesCount - 1) {
      pageNumbers.push(DOTS)
    }

    pageNumbers.push(pagesCount)
  }

  return pageNumbers
}

export const Pagination = (props: PaginationProps) => {
  const {
    totalCount = 10,
    currentPage,
    pageSize,
    siblingCount = 1,
    onPageSizeChange,
    onCurrentPageChange,
    options,
    portionValue,
  } = props

  const pagesCount = Math.ceil(totalCount / pageSize)

  const onNext = () => {
    onCurrentPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onCurrentPageChange(currentPage - 1)
  }

  const onPageSizeHandler = (value: string) => {
    onPageSizeChange(+value)
  }

  const mappedPageNumbers = renderPageNumbers(siblingCount, currentPage, pagesCount)
  const classNames = {
    arrowButton: clsx(s.pageStyle, s.arrowButtonsStyle),
  }
  const primaryArrowColor = 'white'
  const disabledArrowColor = '#4C4C4C'

  return (
    <div className={s.paginationWrapper}>
      <div>
        <button
          className={classNames.arrowButton}
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          <ArrowLeft
            fill={currentPage === 1 ? disabledArrowColor : primaryArrowColor}
            className={clsx(s.arrowStyle)}
          />
        </button>
        {mappedPageNumbers.map((el, i) => (
          <button
            key={i}
            className={clsx(
              s.pageStyle,
              el === currentPage && s.activePageStyle,
              el === DOTS && s.dotsStyle
            )}
            onClick={() => onCurrentPageChange(el)}
            disabled={el === DOTS}
          >
            {el}
          </button>
        ))}
        <button
          className={classNames.arrowButton}
          onClick={onNext}
          disabled={currentPage === pagesCount}
        >
          <ArrowRight
            fill={currentPage === pagesCount ? disabledArrowColor : primaryArrowColor}
            className={s.arrowStyle}
          />
        </button>
      </div>
      <div className={s.selectWrapper}>
        Show
        <SelectCustom
          className={'pagination'}
          options={options}
          value={portionValue}
          defaultValue={pageSize.toString()}
          onValueChange={onPageSizeHandler}
        />
        on page
      </div>
    </div>
  )
}
