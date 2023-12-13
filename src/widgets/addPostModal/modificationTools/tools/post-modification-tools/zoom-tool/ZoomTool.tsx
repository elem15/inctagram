import React, { FC } from 'react'

import s from './ZoomTool.module.scss'

import { ZoomToolIcon } from '@/shared/assets/icons/ZoomToolIcon'
import { CustomDropdown, CustomDropdownItem, Typography } from '@/shared/components'
import { SliderDemo } from '@/shared/components/slider'
type Props = {
  zoomValue: number[]
  onChange: (value: number[]) => void
}
export const ZoomTool: FC<Props> = ({ zoomValue, onChange }) => {
  const zoomTrigger = (
    <div className={s.tool}>
      <ZoomToolIcon />
    </div>
  )
  const onSelect = (event: Event) => {
    event.preventDefault()
  }

  return (
    <div>
      <CustomDropdown
        trigger={zoomTrigger}
        className={s.customContentBox}
        align={'start'}
        side={'top'}
        isArrow={false}
        sideOffset={2}
      >
        <CustomDropdownItem className={s.zoomItem} onSelect={onSelect}>
          <SliderDemo onChange={onChange} values={zoomValue} style={{ width: '97px' }} />
        </CustomDropdownItem>
      </CustomDropdown>
    </div>
  )
}
