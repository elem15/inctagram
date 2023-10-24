import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import { SearchIcon } from '../../assets/'
import { Typography } from '../typography/'

import s from './input.module.scss'

export type InputProps = {
  onChangeValue?: (value: string) => void
  error?: string
  disabled?: boolean
  label?: string
  type?: 'text' | 'password' | 'search'
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onChangeValue, value, error, disabled, onChange, label, type, ...restProps }, ref) => {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onChangeValue?.(e.currentTarget.value)
    }

    const classNames = {
      passwordControl: clsx(s.passwordControl, visiblePassword ? s.showPassword : s.hidePassword),
    }

    return (
      <div className={s.inputWrapper}>
        <label className={s.label}>{label}</label>

        <div className={s.inputContainer}>
          {type === 'search' && <SearchIcon className={s.searchIcon} />}
          <input
            id={restProps.id}
            placeholder={restProps.placeholder}
            type={'password' && visiblePassword ? 'text' : type}
            className={`${error ? s.error : s.input}`}
            onChange={onChangeHandler}
            disabled={disabled}
            ref={ref}
            value={value}
          />
          {type === 'password' && (
            <a
              className={classNames.passwordControl}
              onClick={() => {
                setVisiblePassword(prevState => !prevState)
              }}
            ></a>
          )}
          {error && (
            <Typography variant="regular_text_14" className={s.errorMessage}>
              {error}
            </Typography>
          )}
        </div>
      </div>
    )
  }
)
