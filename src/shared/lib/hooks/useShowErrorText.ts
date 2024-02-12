import { useState } from 'react'

export const useErrorText = () => {
  const [errorText, setErrorText] = useState<string | undefined>()
  const showErrorText = (text: string) => {
    setErrorText(text)
  }

  return {
    errorText,
    showErrorText,
  }
}
