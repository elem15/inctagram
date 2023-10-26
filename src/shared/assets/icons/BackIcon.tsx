import { Ref, SVGProps, forwardRef } from 'react'
const BackIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    {...props}
    fill={'none'}
    height={16}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={16}
    xmlns={'http://www.w3.org/2000/svg'}
  >
    <path
      d={
        'M19 11H7.14l3.63-4.36a1.001 1.001 0 0 0-1.54-1.28l-5 6a1.191 1.191 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13.026.052.056.102.09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .77-1.64L7.14 13H19a1 1 0 0 0 0-2Z'
      }
      fill={'#f9f7ff'}
    />
  </svg>
)
const ForwardRef = forwardRef(BackIcon)

export { ForwardRef as BackIcon }
