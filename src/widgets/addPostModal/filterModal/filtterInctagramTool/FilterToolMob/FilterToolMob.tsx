import React from 'react'

import s from './FilterToolMob.module.scss'

import { updateFilterClass } from '@/app/services/cropper-slice'
import { Typography } from '@/shared/components'
import { useAppDispatch } from '@/shared/lib'
import { filters } from '@/widgets/addPostModal/filterModal/filtterInctagramTool/FilttersTool'

type FilterPropsType = {
  idOfImage: string
  photo: any
}

export const FilterToolMob = ({ idOfImage, photo }: FilterPropsType) => {
  const dispatch = useAppDispatch()

  return (
    <div className={s.scrollImg}>
      {filters.map(filter => {
        return (
          <div className={s.filterBox} key={filter.name}>
            <div
              onClick={() => {
                dispatch(updateFilterClass({ id: idOfImage, filterClass: filter.style }))
              }}
            >
              <img
                src={photo}
                alt={filter.name}
                style={{
                  objectFit: 'cover',
                  filter: filter.style,
                }}
                className={s.filterImg}
              />

              <Typography variant={'regular_text_14'} style={{ textAlign: 'center' }}>
                {filter.name}
              </Typography>
            </div>
          </div>
        )
      })}
    </div>
  )
}
