import s from './RegisteredUsers.module.scss'

import { Typography } from '@/shared/components'

export const RegisteredUsers = () => {
  const counter = Array.from(Array(7).keys())

  return (
    <div className={s.container}>
      <div className="w-full flex justify-between items-center">
        <Typography className={s.label} variant="h2">
          Registered Users
        </Typography>
        <ul className={s.counter}>
          {counter?.map((el, i) => {
            return <li key={i}>{el}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
