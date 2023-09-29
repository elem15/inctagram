import { NextPage } from 'next'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export const Home: NextPage = () => {
  const { data: session } = useSession()

  // @ts-ignore
  // const { accessToken } = session

  return (
    <>
      <h3>Signed in as {session?.user?.email}</h3>
      {/* <div>{accessToken}</div> */}
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
      </ul>
    </>
  )
}
