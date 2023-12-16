import React, { ReactNode, useEffect, useRef } from 'react'

type ClickOutsideProps = {
  children: ReactNode
  onClickOutside: () => void
}

export const ClickOutside: React.FC<ClickOutsideProps> = ({ children, onClickOutside }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      onClickOutside()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return <div ref={wrapperRef}>{children}</div>
}
