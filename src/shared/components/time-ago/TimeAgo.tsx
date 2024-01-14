import { memo } from 'react'

import ReactTimeAgo from 'react-time-ago'

type Props = { updatedAt: string; lg: string }

export const TimeAgo = memo(function TimeAgo({ updatedAt, lg }: Props) {
  return <ReactTimeAgo date={Date.parse(updatedAt)} locale={lg} />
})
