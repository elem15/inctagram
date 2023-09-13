import React from 'react'

import Link from 'next/link'

const Navbar = () => {
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
    </ul>
  )
}

export default Navbar
