import { useEffect } from 'react'

// eslint-disable-next-line import/no-named-as-default
import NProgress from 'nprogress'

export const useFetchLoader = (isLoading: boolean) => {
  useEffect(() => {
    isLoading ? NProgress.start() : NProgress.done()
  }, [isLoading])
}
