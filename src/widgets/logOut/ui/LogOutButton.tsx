import { useState } from 'react'

import { createPortal } from 'react-dom'

import { LogOutWidget } from './LogOutWidget'

export function LogOutButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log out</button>
      {showModal &&
        createPortal(<LogOutWidget onClose={() => setShowModal(false)} />, document.body)}
    </>
  )
}
