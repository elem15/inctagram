import React, { useState } from 'react'

import './CustomSlider.css'

export const CustomSlider = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const slideNext = () => {
    setActiveIndex(val => {
      if (val >= children.length - 1) {
        return 0
      } else {
        return val + 1
      }
    })
  }

  const slidePrev = () => {
    setActiveIndex(val => {
      if (val <= 0) {
        return children.length - 1
      } else {
        return val - 1
      }
    })
  }

  return (
    <div className="container__slider">
      {children?.map((item, index) => {
        return (
          <div className={'slider__item slider__item-active-' + (activeIndex + 1)} key={index}>
            {item}
          </div>
        )
      })}

      <div className="container__slider__links">
        {children?.map((item, index) => {
          return (
            <div
              key={index}
              className={
                activeIndex === index
                  ? 'container__slider__links-small container__slider__links-small-active'
                  : 'container__slider__links-small'
              }
              onClick={e => {
                e.preventDefault()
                setActiveIndex(index)
              }}
            ></div>
          )
        })}
      </div>

      <button
        className="slider__btn-next"
        onClick={e => {
          e.preventDefault()
          slideNext()
        }}
      >
        {'>'}
      </button>
      <button
        className="slider__btn-prev"
        onClick={e => {
          e.preventDefault()
          slidePrev()
        }}
      >
        {'<'}
      </button>
    </div>
  )
}
