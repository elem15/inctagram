import { SVGProps, Ref, forwardRef } from 'react'
const MyProfileIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    viewBox="0 0 24 24"
    height="1em"
    fill="none"
    ref={ref}
  >
    <path
      fill="#000"
      d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM12 13a7 7 0 0 0-7 7 1 1 0 1 0 2 0 5 5 0 1 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7Z"
    />
  </svg>
)
const ForwardRef = forwardRef(MyProfileIcon)

export { ForwardRef as MyProfileIcon }
