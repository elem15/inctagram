import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import SearchIcon from '../../assets/icons/SearchIcon.svg'
import { Typography } from '../typography/'

import s from './input.module.scss'

export type TextFieldProps = {
  onChangeValue?: (value: string) => void
  error?: string
  disabled?: boolean
  label?: string
  type?: 'text' | 'password' | 'search'
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ onChangeValue, value, error, disabled, onChange, label, type, ...restProps }, ref) => {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onChangeValue?.(e.currentTarget.value)
    }

    return (
      <div className={s.inputWrapper}>
        <label className={s.label}>{label}</label>

        <div className={s.inputContainer}>
          {type === 'search' && (
            <img src={SearchIcon} className={s.searchIcon} alt={'Search Icon'} />
          )}
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
              className={`${s.passwordControl} ${
                visiblePassword ? s.showPassword : s.hidePassword
              }`}
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
