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

  return <div>{message && <Alert message={message} onClose={onClose} variant={variant} />}</div>
}
