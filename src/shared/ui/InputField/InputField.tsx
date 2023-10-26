import { forwardRef } from 'react'

import { default as cn } from 'classnames'

import { IField } from '../../types'

import styles from './InputField.module.css'

export const InputField = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, helperText, label, type = 'text', style, ...rest }, ref) => {
    return (
      <div className={styles.wrapper} style={style}>
        <label className={styles.label}>{label}</label>
        <div className={helperText ? '' : 'mb-4'}>
          <input
            autoComplete="off"
            ref={ref}
            type={type}
            {...rest}
            placeholder={placeholder}
            className={cn(styles.input, helperText ? 'border-danger-500' : 'border-dark-100 ')}
          />
        </div>

        {helperText && <div className="max-w-[330px] text-danger-500 text-sm">{helperText}</div>}
      </div>
    )
  }
)
