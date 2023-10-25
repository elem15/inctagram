import { SVGProps, Ref, forwardRef } from 'react'
const LogOutIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    ref={ref}
  >
    <g fill="#fff" clipPath="url(#a)">
      <path d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6h1ZM20.82 11.42l-2.82-4a1 1 0 1 0-1.63 1.16L18.09 11H10a1 1 0 1 0 0 2h8l-1.8 2.4a1 1 0 1 0 1.6 1.2l3-4a1 1 0 0 0 .02-1.18Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(LogOutIcon)

export { ForwardRef as LogOutIcon }
