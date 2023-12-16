import { ChangeEvent, ComponentProps, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './TextArea.module.scss'
type Props = {
  errorMessage?: string
  label?: string
  isError?: boolean
} & ComponentProps<'textarea'>
export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, isError = false, errorMessage, id, label, onChange, ...rest }, ref) => {
    const showError = !!errorMessage

    function handleInputValueChanged(e: ChangeEvent<HTMLTextAreaElement>) {
      onChange?.(e)
    }

    return (
      <div className={s.container}>
        {label && <label className={s.label}>{label}</label>}
        <textarea
          className={clsx(s.textarea, showError && s.error)}
          onChange={handleInputValueChanged}
          ref={ref}
          {...rest}
        />

        {showError && <div className={s.error}>{errorMessage}</div>}
      </div>
    )
  }
)
