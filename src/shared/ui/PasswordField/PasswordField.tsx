import { forwardRef, useState } from 'react'

import { default as cn } from 'classnames'

import { IField } from '../../types'

import styles from './PasswordField.module.css'

import { EyeOffOutlineIcon, EyeOutlineIcon } from '@/shared/assets'

export const PasswordField = forwardRef<HTMLInputElement, IField>(
  ({ label, placeholder, helperText, style, ...rest }, ref) => {
    const [type, setType] = useState('password')

    const togglePassword = () => {
      if (type === 'password') setType('text')
      else setType('password')
    }

    return (
      <div style={style}>
        <label className={styles.label}>{label}</label>
        <div className={`${helperText ? '' : 'mb-4'} relative`}>
          <input
            ref={ref}
            type={type}
            {...rest}
            placeholder={placeholder}
            className={cn(styles.input, helperText ? 'border-danger-500' : 'border-dark-100 ')}
          />
          <span
            className="absolute top-1/2 right-3 -translate-y-1/2 fill-light-100 cursor-pointer"
            onClick={togglePassword}
          >
            {type === 'password' ? <EyeOutlineIcon /> : <EyeOffOutlineIcon />}
          </span>
        </div>
        {helperText && <div className="max-w-[330px] text-danger-500 text-sm">{helperText}</div>}
      </div>
    )
  }
)
