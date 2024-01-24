import React from 'react'

import { CropTool } from './crop-tool'
import s from './PostPhotoModificationTools.module.scss'
import { ZoomTool } from './zoom-tool'

type Props = {
  zoomValue: number[]
  onChange: (value: number[]) => void
  imageId: string
}
export const PostPhotoModificationTools = ({ zoomValue, onChange, imageId }: Props) => {
  return (
    <div className={s.toolBox}>
      <div className={s.sizeBox}>
        <CropTool imageId={imageId} />
        <ZoomTool zoomValue={zoomValue} onChange={onChange} />
      </div>
    </div>
  )
}
