/* eslint-disable import/no-duplicates */
import { useMemo } from 'react'

import { format } from 'date-fns'
// eslint-disable-next-line import/order
import ru from 'date-fns/locale/ru'

export const useFormatDate = (lg: string) => {
  const locale = useMemo(() => (lg === 'ru' ? ru : undefined), [lg])

  const formatDate = (updatedAt: string) =>
    locale
      ? format(new Date(updatedAt), 'dd MMMM yyyy', { locale })
      : format(new Date(updatedAt), 'MMMM dd, yyyy')

  return { formatDate }
}
