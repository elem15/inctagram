import { useState } from 'react'

export const useModal = () => {
  const [modalState, setModalState] = useState<{ isOpen: boolean; modalId?: number }>({
    isOpen: false,
    modalId: NaN,
  })

  function openModal(modalId?: number): void {
    modalId
      ? setModalState({ isOpen: true, modalId })
      : setModalState({ isOpen: true, modalId: undefined })
  }

  const closeModal = () => {
    setModalState({ isOpen: false, modalId: undefined })
  }

  return {
    closeModal,
    isOpen: modalState.isOpen,
    openModal,
    modalId: modalState.modalId,
  }
}
