import s from './RegisteredUsers.module.scss'

import { useGetPublicPostsQuery } from '@/entities/publicPosts'
import { Typography } from '@/shared/components'

export const RegisteredUsers = () => {
  const {
    data,
    isError: isErrorRegisteredUsersData,
    isLoading: isLoadingRegisteredUsersData,
    isSuccess: isSuccessRegisteredUsersData,
  } = useGetPublicPostsQuery()

  const counter = data?.usersCounter
  const counterArray = Array.from(String(counter))

  return (
    <div className={s.container}>
      {isSuccessRegisteredUsersData && (
        <div className="w-full flex justify-between items-center">
          <Typography className={s.label} variant="h2">
            Registered Users
          </Typography>
          <ul className={s.counter}>{counterArray?.map((el, i) => <li key={i}>{el}</li>)}</ul>
        </div>
      )}
    </div>
  )
}
