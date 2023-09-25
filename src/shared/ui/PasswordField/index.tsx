import { forwardRef, useState } from 'react'

import { IField } from '../InputField'

import styles from './PasswordField.module.scss'

import { EyeOffOutlineIcon, EyeOutlineIcon } from '@/shared/assets'

export const PasswordField = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, name, style, ...rest }, ref) => {
    const [type, setType] = useState('password')

    const togglePassword = () => {
      if (type === 'password') setType('text')
      else setType('password')
    }

    return (
      <div className={styles.wrapper} style={style}>
        <label>{name}</label>
        <div>
          <input type={type} placeholder={placeholder} />
          <span onClick={togglePassword}>
            {type === 'password' ? <EyeOutlineIcon /> : <EyeOffOutlineIcon />}
          </span>
        </div>
      </div>
    )
  }
)
