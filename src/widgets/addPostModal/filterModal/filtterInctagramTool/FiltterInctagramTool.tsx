import React, { useEffect } from 'react'

import s from './FiltterInctagramTool.module.scss'

import '../instagram.min.scss'
import { updateFilterClass } from '@/app/services/cropper-slice'
import { Typography } from '@/shared/components'
import { useAppDispatch } from '@/shared/lib'

type Props = {
  filterClass: string
  imgRef: any
  photo: any
  onFilterComplete?: (filteredImage: any) => void
  idOfImage: string
}

export const FiltersInsta = ({
  filterClass,

  imgRef,
  photo,
  onFilterComplete,
  idOfImage,
}: Props) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const divImg = imgRef.current

    if (divImg) {
      divImg.style.filter = ''
    }
  }, [filterClass])
  // const applyFilter = selectedFilter => {
  //   const filteredImage = applyFilterToImage(selectedFilter)
  //
  //   onFilterComplete(filteredImage)
  // }
  //
  // const applyFilterToImage = selectedFilter => {
  //   const filteredImage = { ...photo[0], filter: selectedFilter }
  //
  //   console.log(filteredImage)
  //
  //   return filteredImage
  // }
  const filters = [
    // {
    //   name: 'Aden',
    //   class: 'filter-aden',
    // },
    // {
    //   name: 'Amaro',
    //   class: 'filter-amaro',
    // },
    // {
    //   name: 'Ashby',
    //   class: 'filter-ashby',
    // },
    // {
    //   name: 'Brannan',
    //   class: 'filter-brannan',
    // },
    // {
    //   name: 'Brooklyn',
    //   class: 'filter-brooklyn',
    // },
    // {
    //   name: 'Charmes',
    //   class: 'filter-charmes',
    // },
    {
      name: 'Clarendon',
      class: 'filter-clarendon',
    },
    // {
    //   name: 'Crema',
    //   class: 'filter-crema',
    // },
    // {
    //   name: 'Dogpatch',
    //   class: 'filter-dogpatch',
    // },
    // {
    //   name: 'Earlybird',
    //   class: 'filter-earlybird',
    // },
    {
      name: 'Gingham',
      class: 'filter-gingham',
    },
    // {
    //   name: 'Ginza',
    //   class: 'filter-ginza',
    // },
    // {
    //   name: 'Hafe',
    //   class: 'filter-hafe',
    // },
    // {
    //   name: 'Helena',
    //   class: 'filter-helena',
    // },
    // {
    //   name: 'Hudson',
    //   class: 'filter-Inkwell',
    // },
    // {
    //   name: 'Inkwell',
    //   class: 'filter-inkwell',
    // },
    // {
    //   name: 'Kelvin',
    //   class: 'filter-kelvin',
    // },
    {
      name: 'Lark',
      class: 'filter-lark',
    },
    {
      name: 'Lo-fi',
      class: 'filter-lofi',
    },
    // {
    //   name: 'Ludwing',
    //   class: 'filter-ludwing',
    // },
    {
      name: 'Reyes',
      class: 'filter-reyes',
    },
    {
      name: 'Maven',
      class: 'filter-maven',
    },
    {
      name: 'Mayfair',
      class: 'filter-mayfair',
    },
    {
      name: 'Moon',
      class: 'filter-moon',
    },

    // {
    //   name: 'Rise',
    //   class: 'filter-rise',
    // },
    // {
    //   name: 'Sierra',
    //   class: 'filter-sierra',
    // },
    // {
    //   name: 'Skyline',
    //   class: 'filter-skyline',
    // },
    // {
    //   name: 'Slumber',
    //   class: 'filter-slumber',
    // },
    // {
    //   name: 'Stinson',
    //   class: 'filter-stinson',
    // },
    // {
    //   name: 'Sutro',
    //   class: 'filter-sutro',
    // },
    // {
    //   name: 'Toaster',
    //   class: 'filter-toaster',
    // },
    // {
    //   name: 'Valencia',
    //   class: 'filter-valencia',
    // },
    // {
    //   name: 'Vesper',
    //   class: 'filter-vesper',
    // },
    // {
    //   name: 'Walden',
    //   class: 'filter-walden',
    // },
    // {
    //   name: 'Willow',
    //   class: 'filter-willow',
    // },
    // {
    //   name: 'X-Pro II',
    //   class: 'filter-xpro-ii',
    // },
  ]

  // const setFilterAndApplyFilter = (filterClass: string) => {
  //   setFilterClass(filterClass)
  //   applyFilter(filterClass)
  // }
const changeFilter=()=>{

}

  return (
    <>
      {filters.map((filter, index) => {
        return (
          <div key={index}>
            <div
              className={`filter-item ${
                filterClass === filter.class ? 'filter-item--selected' : ''
              }`}
              onClick={() => {
                dispatch(updateFilterClass({ id: idOfImage, filterClass: filter.class }))
              }}
            >
              <div style={{ width: '108px', height: '108px' }}>
                <img
                  className={filter.class}
                  src={photo}
                  alt={filter.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <Typography variant={'regular_text_16'} style={{ textAlign: 'center' }}>
                {filter.name}
              </Typography>
            </div>
          </div>
        )
      })}
    </>
  )
}
