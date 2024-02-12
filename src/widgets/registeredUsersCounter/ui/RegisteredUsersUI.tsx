import s from './RegisteredUsers.module.scss'

import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'

type Props = {
  totalUsers: number
}
export const RegisteredUsersUI = ({ totalUsers }: Props) => {
  const counterArray = Array.from(String(totalUsers))

  const { t } = useTranslation()

  return (
    <div className={s.container}>
      <div className="w-full flex justify-between items-center">
        <Typography className={s.label} variant="h2">
          {t.registered_users.title}
        </Typography>
        <ul className={s.counter}>{counterArray?.map((el, i) => <li key={i}>{el}</li>)}</ul>
      </div>
    </div>
  )
}
