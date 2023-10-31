import * as React from 'react'
import { SVGProps, Ref, forwardRef } from 'react'
const CloseIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    viewBox="0 0 24 24"
    height="24px"
    fill="none"
    ref={ref}
  >
    <path
      fill="#fff"
      d="m13.41 12 4.3-4.29a1.004 1.004 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1.004 1.004 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219l4.29-4.3 4.29 4.3a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095L13.41 12Z"
    />
  </svg>
)
const ForwardRef = forwardRef(CloseIcon)

export { ForwardRef as CloseIcon }
