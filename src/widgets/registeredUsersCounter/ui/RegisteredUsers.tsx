import s from './RegisteredUsers.module.scss'

import { useGetPublicPostsQuery } from '@/entities/publicPosts'
import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'

export const RegisteredUsers = () => {
  const {
    data,
    isError: isErrorRegisteredUsersData,
    isLoading: isLoadingRegisteredUsersData,
    isSuccess: isSuccessRegisteredUsersData,
  } = useGetPublicPostsQuery()

  const counter = data?.usersCounter
  const counterArray = Array.from(String(counter))

  const { t } = useTranslation()

  return (
    <>
      {isSuccessRegisteredUsersData && (
        <div className={s.container}>
          <div className="w-full flex justify-between items-center">
            <Typography className={s.label} variant="h2">
              {t.registered_users.title}
            </Typography>
            <ul className={s.counter}>{counterArray?.map((el, i) => <li key={i}>{el}</li>)}</ul>
          </div>
        </div>
      )}
    </>
  )
}
