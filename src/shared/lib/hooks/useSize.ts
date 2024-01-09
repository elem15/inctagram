import { useEffect, useState } from 'react'

export const useSize = () => {
  const [windowSize, setWindowSize] = useState([window.innerHeight, window.innerWidth])

  useEffect(() => {
    const windowSizeHandler = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', windowSizeHandler)

    return () => {
      window.removeEventListener('resize', windowSizeHandler)
    }
  }, [])

  return windowSize
}
