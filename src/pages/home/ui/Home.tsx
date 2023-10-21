import { NextPage } from 'next'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Input } from '../../../shared/components/input'

import { useGoogleLogin } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { LogOutButton } from '@/widgets/logOut'
import { Spinner } from '@/widgets/spinner'

export function Home() {
  const { isAuth, email } = useAuth()

  const searchParams = useSearchParams()

  const code = searchParams?.get('code') as string | undefined

  const { isLoading, error } = useGoogleLogin(code)

  return (
    <div>
      {isLoading && <Spinner />}
      {error && <div className="text-red-600">Google authorization error</div>}
      <ul>
        <li>
          <Link href="home">Home</Link>
        </li>
        <li>
          <Link href="email-sent">Email sent</Link>
        </li>
        <li>
          <Link href="signup">Sign Up</Link>
        </li>
        <li>
          <Link href="auth/registration-confirmation">Sign Up Confirmed</Link>
        </li>
        <li>
          <Link href="signin">Sign In</Link>
        </li>
        <li>
          <Link href="resend">Resend Verification Link Password recovery</Link>
        </li>
        <li>
          <Link href="auth/registration-resend">Resend Verification Link Registration</Link>
        </li>
        <li>
          <Link href="email">Send Email menu</Link>
        </li>
        <li>
          <Link href="auth/forgot-password">Forgot password</Link>
        </li>
        <li>
          <Link href="auth/recovery">Create new password</Link>
        </li>
      </ul>
      {isAuth && (
        <>
          <LogOutButton /> <span>{email}</span>
        </>
      )}
      <Input type="search" />
    </div>
  )
}
