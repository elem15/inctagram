import * as React from 'react'

export const ZoomToolIcon = ({ size = 24, color = '#fff', ...props }) => {
  return (
    <svg viewBox="0 0 24 24" fill={color} height={size} width={size} {...props}>
      <path d="M15 10h-3V7a1 1 0 00-2 0v3H7a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2zm6.71 10.29L18 16.61A9 9 0 1016.61 18l3.68 3.68a1 1 0 001.42 0 1 1 0 000-1.39zM11 18a7 7 0 117-7 7 7 0 01-7 7z" />
    </svg>
  )
}
