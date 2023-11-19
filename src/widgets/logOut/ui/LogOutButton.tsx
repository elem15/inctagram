import { ReactNode, useState } from 'react'

import { createPortal } from 'react-dom'

import { LogOutWidget } from './LogOutWidget'

export function LogOutButton({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button onClick={() => setShowModal(true)}>{children}</button>
      {showModal &&
        createPortal(<LogOutWidget onClose={() => setShowModal(false)} />, document.body)}
    </>
  )
}
