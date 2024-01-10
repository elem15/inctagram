import { useState } from 'react'

export const useModal = () => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; modalId: number }>({
    isOpen: false,
    modalId: NaN,
  })

  const openModal = (modalId?: number) => {
    modalId
      ? setModalState({ isOpen: true, modalId })
      : setModalState({ isOpen: true, modalId: NaN })
  }

  const closeModal = () => {
    setModalState({ isOpen: false, modalId: NaN })
  }

  return {
    closeModal,
    isOpen: modalState.isOpen,
    openModal,
    modalId: modalState.modalId,
  }
}
