import React from 'react'

import { AddNewPhotoTool } from './add-new-photo-tool'
import { CropTool } from './crop-tool'
import s from './PostPhotoModificationTools.module.scss'
import { ZoomTool } from './zoom-tool'

import { RotateIcon } from '@/shared/assets/icons/RotateIcon'
import { RotationTool } from '@/widgets/addPostModal/modificationTools/tools/post-modification-tools/rotation-tool'
type Props = {
  zoomValue: number[]
  onChange: (value: number[]) => void
  onAspectChange: (selectedAspect: string) => void
  // onRotationChange: (value: number[]) => void
  //rotationValue: number[]
  // deletePhoto: (i: number) => void
  imageId: string
  selectNewPhoto: () => void
}
export const PostPhotoModificationTools = ({
  zoomValue,
  onChange,
  onAspectChange,
  //rotationValue,
  // onRotationChange,
  imageId,
  selectNewPhoto, // deletePhoto,
}: Props) => {
  return (
    <div className={s.toolBox}>
      <div className={s.sizeBox}>
        <CropTool imageId={imageId} />
        <ZoomTool zoomValue={zoomValue} onChange={onChange} />
        {/*<RotationTool rotationValue={rotationValue} onRotationChange={onRotationChange} />*/}
      </div>
      <AddNewPhotoTool selectNewPhoto={selectNewPhoto} />
    </div>
  )
}
