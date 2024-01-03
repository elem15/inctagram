import { FC } from 'react'

import { updateFilterClass } from '@/app/services/cropper-slice'
import { Typography } from '@/shared/components'
import { useAppDispatch } from '@/shared/lib'

type Props = {
  filterClass: string
  idOfImage: string
  photo: any
}
export const NormalFilter: FC<Props> = ({ filterClass, idOfImage, photo }) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <div
        className={`filter-item ${filterClass === 'filter-normal' ? 'filter-item--selected' : ''}`}
        onClick={() => dispatch(updateFilterClass({ id: idOfImage, filterClass: 'filter-normal' }))}
      >
        <div style={{ width: '108px', height: '108px' }}>
          <img
            src={photo}
            alt="Normal"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <Typography variant={'regular_text_16'} style={{ textAlign: 'center' }}>
          Normal
        </Typography>
      </div>
    </div>
  )
}
