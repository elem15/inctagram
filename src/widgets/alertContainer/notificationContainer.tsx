import { useEffect } from 'react'

import { clearAlert } from '@/app/services'
import { Alert } from '@/shared/components/alert/Alert'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

export const NotificationContainer = () => {
  const message = useAppSelector(state => state.appSlice.message)
  const variant = useAppSelector(state => state.appSlice.variant)
  const dispatch = useAppDispatch()
  const onClose = () => {
    dispatch(clearAlert())
  }

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        dispatch(clearAlert())
      }, 6000)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [message, dispatch])

  return <div>{message && <Alert message={message} onClose={onClose} variant={variant} />}</div>
}
