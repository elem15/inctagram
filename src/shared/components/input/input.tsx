import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { clsx } from 'clsx'

import { Typography } from '../typography/'

import s from './input.module.scss'

import { EyeOffOutline, EyeOutline, SearchIcon } from '@/shared/assets'
import { IconLocation } from '@/shared/assets/icons/IconLocation'

export type InputProps = {
  onChangeValue?: (value: string) => void
  error?: string
  disabled?: boolean
  label?: string
  labelClass?: string
  type?: 'text' | 'password' | 'search' | 'location'
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onChangeValue,
      value,
      style,
      error,
      disabled,
      onChange,
      label,
      labelClass,
      type,
      ...restProps
    },
    ref
  ) => {
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
        <label className={clsx(s.label, labelClass && s[labelClass])}>{label}</label>

        <div className={s.inputContainer}>
          {type === 'search' && <SearchIcon className={s.searchIcon} />}
          {type === 'location' && <IconLocation className={s.locationIcon} />}

          <input
            id={restProps.id}
            placeholder={restProps.placeholder}
            type={'password' && visiblePassword ? 'text' : type}
            className={`${error ? s.error : s.input}`}
            onChange={onChangeHandler}
            disabled={disabled}
            ref={ref}
            value={value}
            {...restProps}
          />
          {type === 'password' && (
            <button
              className={classNames.passwordControl}
              onClick={() => setVisiblePassword(prevState => !prevState)}
            >
              {visiblePassword ? <EyeOutline /> : <EyeOffOutline />}
            </button>
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
