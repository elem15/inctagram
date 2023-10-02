import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Home: NextPage = () => {
  return (
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
        <Link href="signin">Sign In</Link>
      </li>
      <li>
        <Link href="resend">Resend Verification Link</Link>
      </li>
      <li>
        <Link href="email">Send Email menu</Link>
      </li>
    </ul>
  )
}
