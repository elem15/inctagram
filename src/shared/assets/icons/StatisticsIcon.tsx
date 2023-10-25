import { SVGProps, Ref, forwardRef } from 'react'
const StatisticsIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M21 7c.01-.07.01-.14 0-.21a.639.639 0 0 0-.05-.17 1.097 1.097 0 0 0-.09-.14.75.75 0 0 0-.14-.17l-.12-.07a.689.689 0 0 0-.19-.1h-.2A.7.7 0 0 0 20 6h-5a1 1 0 1 0 0 2h2.83l-4 4.71-4.32-2.57a1 1 0 0 0-1.28.22l-5 6a1 1 0 0 0 1.195 1.546 1 1 0 0 0 .345-.266l4.45-5.34 4.27 2.56a1 1 0 0 0 1.27-.21L19 9.7V12a1 1 0 1 0 2 0V7Z"
    />
  </svg>
)
const ForwardRef = forwardRef(StatisticsIcon)

export { ForwardRef as StatisticsIcon }
