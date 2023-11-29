export function IconBack({ size = '24px', color = '#fff', ...svgProps }) {
  return (
    <svg viewBox="0 0 512 512" fill={color} height={size} width={size} {...svgProps}>
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={48}
        d="M244 400L100 256l144-144M120 256h292"
      />
    </svg>
  )
}
