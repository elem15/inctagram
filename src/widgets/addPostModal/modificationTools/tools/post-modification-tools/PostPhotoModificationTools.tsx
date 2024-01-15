import React from 'react'

import { AddNewPhotoTool } from './add-new-photo-tool'
import { CropTool } from './crop-tool'
import s from './PostPhotoModificationTools.module.scss'
import { ZoomTool } from './zoom-tool'

type Props = {
  zoomValue: number[]
  onChange: (value: number[]) => void
  onAspectChange: (selectedAspect: string) => void
  closePostModal: () => void
  imageId: string
  selectNewPhoto: () => void
  setImageScr: (img: string | null) => void
}
export const PostPhotoModificationTools = ({
  zoomValue,
  onChange,
  imageId,
  selectNewPhoto,
  closePostModal,
  setImageScr,
}: Props) => {
  return (
    <div className={s.toolBox}>
      <div className={s.sizeBox}>
        <CropTool imageId={imageId} />
        <ZoomTool zoomValue={zoomValue} onChange={onChange} />
      </div>
      <AddNewPhotoTool
        selectNewPhoto={selectNewPhoto}
        closePostModal={closePostModal}
        setImageScr={setImageScr}
      />
    </div>
  )
}
