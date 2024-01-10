import { useEffect, useState } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalId, setModalId] = useState<number>()

  const openModal = (modalId?: number) => {
    modalId ? setModalId(modalId) : setIsOpen(true)
  }

  useEffect(() => {
    modalId && setIsOpen(true)
  }, [modalId])

  const closeModal = () => {
    setIsOpen(false)
  }

  return {
    closeModal,
    isOpen,
    openModal,
    modalId,
  }
}
