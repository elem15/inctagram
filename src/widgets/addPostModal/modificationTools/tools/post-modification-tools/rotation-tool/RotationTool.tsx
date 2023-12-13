import React, { FC } from 'react'

import s from '../zoom-tool/ZoomTool.module.scss'

import { RotateIcon } from '@/shared/assets/icons/RotateIcon'
import { ZoomToolIcon } from '@/shared/assets/icons/ZoomToolIcon'
import { CustomDropdown, CustomDropdownItem, Typography } from '@/shared/components'
import { SliderDemo } from '@/shared/components/slider'
type Props = {
  onRotationChange: (value: number[]) => void
  rotationValue: number[]
}
export const RotationTool: FC<Props> = ({ rotationValue, onRotationChange }) => {
  const zoomTrigger = (
    <div className={s.tool}>
      <RotateIcon />
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
          <SliderDemo
            onChange={onRotationChange}
            values={rotationValue}
            style={{ width: '97px' }}
          />
        </CustomDropdownItem>
      </CustomDropdown>
    </div>
  )
}
