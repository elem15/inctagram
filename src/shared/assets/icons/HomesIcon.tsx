import { SVGProps, Ref, forwardRef } from 'react'
const HomesIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 1"
    width="24px"
    height="24px"
    ref={ref}
  >
    <title>{'Rectangle 5'}</title>
    <path fill="#397DF6" fillRule="evenodd" d="M0 0h48v1H0z" />
  </svg>
)
const ForwardRef = forwardRef(HomesIcon)

export { ForwardRef as HomesIcon }
