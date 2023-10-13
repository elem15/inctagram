import { NextPage } from 'next'
import Link from 'next/link'
import { useTranslation } from '@/shared/hooks'

export const Home: NextPage = () => {
  const { t } = useTranslation()
  return (
    <ul>
      <li>
        <Link href="home">{t.home.home}</Link>
      </li>
      <li>
        <Link href="create">{t.home.create}</Link>
      </li>
      <li>
        <Link href="profile">{t.home.profile}</Link>
      </li>
      <li>
        <Link href="messenger">{t.home.messenger}</Link>
      </li>
      <li>
        <Link href="search">{t.home.search}</Link>
      </li>
      <li>
        <Link href="statistics">{t.home.statistics}</Link>
      </li>
      <li>
        <Link href="favorites">{t.home.favorites}</Link>
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
        <Link href="resend">Send Verification link</Link>
      </li>
      <li>
        <Link href="forgotpassword">Forgot password</Link>
      </li>
    </ul>
  )
}
