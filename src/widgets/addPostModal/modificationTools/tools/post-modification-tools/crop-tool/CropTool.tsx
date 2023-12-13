import React, { useCallback } from 'react'

import { DefaultProfileImg } from '@/shared/assets'
import { FullSizeIcon } from '@/shared/assets/icons/FullSizeIcon'
import { IconRectangleVertical } from '@/shared/assets/icons/RectangleIcon'
import { IconRectangle } from '@/shared/assets/icons/RotatedSquareIcon'
import { IconSquare } from '@/shared/assets/icons/Square'
import { CustomDropdown, CustomDropdownItem, Typography } from '@/shared/components'
import { useModal } from '@/shared/lib/hooks/open-or-close-hook'
import s from '@/widgets/addPostModal/modificationTools/tools/post-modification-tools/PostPhotoModificationTools.module.scss'
type Props = {
  onAspectChange: (aspect: string) => void
}
export const CropTool = ({ onAspectChange }: Props) => {
  const toolTrigger = (
    <div className={s.tool}>
      <FullSizeIcon color={'#fff'} />
    </div>
  )

  return (
    <div className={s.container}>
      <CustomDropdown
        trigger={toolTrigger}
        className={s.customContentBox}
        align={'start'}
        side={'top'}
        sideOffset={2}
        isArrow={false}
      >
        <CustomDropdownItem className={s.item} onClick={() => onAspectChange('contain')}>
          <Typography variant={'h3'}>Оригинал</Typography>
          <DefaultProfileImg style={{ width: '24px', height: '24px', marginLeft: '5px' }} />
        </CustomDropdownItem>
        <CustomDropdownItem className={s.item} onClick={() => onAspectChange('1/1')}>
          <Typography variant={'regular_text_16'}>1:1</Typography>
          <IconSquare />
        </CustomDropdownItem>
        <CustomDropdownItem className={s.item} onClick={() => onAspectChange('vertical')}>
          <Typography variant={'regular_text_16'}>4:5</Typography>
          <IconRectangleVertical />
        </CustomDropdownItem>
        <CustomDropdownItem className={s.item} onClick={() => onAspectChange('horizontal')}>
          <Typography variant={'regular_text_16'}>16:9</Typography>
          <IconRectangle />
        </CustomDropdownItem>
      </CustomDropdown>
    </div>
  )
}
