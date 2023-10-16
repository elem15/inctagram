import { useState } from 'react'

import { createPortal } from 'react-dom'

import { EmailSentPopUpWidget } from './EmailSentPopUpWidget'

export function SetPopUp() {
  const [showModal, setShowModal] = useState(true)

  return (
    <>
      {showModal &&
        createPortal(<EmailSentPopUpWidget onClose={() => setShowModal(false)} />, document.body)}
    </>
  )
}
