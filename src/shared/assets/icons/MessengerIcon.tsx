import { SVGProps, Ref, forwardRef } from 'react'
const MessengersIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    ref={ref}
  >
    <path
      fill="#000"
      d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM16 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM8 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
    />
    <path
      fill="#000"
      d="M19.07 4.93a10 10 0 0 0-16.28 11c.096.199.127.422.09.64L2 20.8a1 1 0 0 0 .605 1.13c.126.05.26.073.395.07h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28l-.05-.02Zm.83 8.36a7.999 7.999 0 0 1-11 6.08 3.26 3.26 0 0 0-1.25-.26 3.424 3.424 0 0 0-.56.05l-2.82.57.57-2.82a3.09 3.09 0 0 0-.21-1.81 8 8 0 0 1 13.033-8.762A8 8 0 0 1 19.9 13.29Z"
    />
  </svg>
)
const ForwardRef = forwardRef(MessengersIcon)

export { ForwardRef as MessengersIcon }
