import { forwardRef, useState } from 'react'

import { default as cn } from 'classnames'

import { IField } from '../../types'

import styles from './PasswordField.module.scss'

import { EyeOffOutlineIcon, EyeOutlineIcon } from '@/shared/assets'

export const PasswordField = forwardRef<HTMLInputElement, IField>(
  ({ label, placeholder, helperText, style, ...rest }, ref) => {
    const [type, setType] = useState('password')

    const togglePassword = () => {
      if (type === 'password') setType('text')
      else setType('password')
    }

    return (
      <div className={styles.wrapper} style={style}>
        <label>{label}</label>
        <div className={helperText ? '' : 'mb-4'}>
          <input
            autoComplete="off"
            ref={ref}
            type={type}
            {...rest}
            placeholder={placeholder}
            className={cn(styles.input, helperText ? 'border-danger-500' : 'border-dark-100 ')}
          />
          <span onClick={togglePassword}>
            {type === 'password' ? <EyeOutlineIcon /> : <EyeOffOutlineIcon />}
          </span>
        </div>
        {helperText && <div className="max-w-[330px] text-danger-500 text-sm">{helperText}</div>}
      </div>
    )
  }
)
