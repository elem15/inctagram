import { NextPage } from 'next'
import Link from 'next/link'

import { logout } from '@/entities/auth/AuthSlice'
import { useAppDispatch, useAppSelector } from '@/shared/model'
import { useAuth } from '@/shared/model/hooks/useAuth'

export const Home: NextPage = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  const { isAuth, email } = useAuth()

  return isAuth ? (
    <ul>
      <li>
        <Link href="home">Home</Link>
      </li>
      <li>
        <Link href="create">Create</Link>
      </li>
      <li>
        <Link href="profile">Profile</Link>
      </li>
      <li>
        <Link href="messenger">Messenger</Link>
      </li>
      <li>
        <Link href="search">Search</Link>
      </li>
      <li>
        <Link href="statistics">Statistics</Link>
      </li>
      <li>
        <Link href="favorites">Favorites</Link>
      </li>
      <li>
        <Link href="signup">Sign Up</Link>
      </li>
      <li>
        <Link href="signup-confirm">Sign Up Confirmed</Link>
      </li>
      <li>
        <Link href="signin">Sign In</Link>
      </li>
      <li>
        <Link href="resend">Resend Verification Link</Link>
      </li>
      <li>
        <Link href="email">Send Email menu</Link>
      </li>
      <li>
        <Link href="counter">Redux Counter: {count}</Link>
      </li>
      <Link href={'/'}>
        <button onClick={() => dispatch(logout())}>Log out {email} </button>
      </Link>
    </ul>
  ) : (
    <div>Nolog</div>
  )
}
