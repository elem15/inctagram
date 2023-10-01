import { forwardRef, useState } from 'react'

import { IField } from '../InputField/Field'

import styles from './PasswordField.module.scss'

import { EyeOffOutlineIcon, EyeOutlineIcon } from '@/shared/assets'

export const PasswordField = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, name, style, ...rest }, ref) => {
    const [type, setType] = useState('password')

    const togglePassword = () => {
      setType(state => (state === 'password' ? 'text' : 'password'))
    }

    return (
      <div className={styles.wrapper} style={style}>
        <label>{name}</label>
        <div>
          <input id="password" type={type} placeholder={placeholder} />
          <span onClick={togglePassword}>
            {type === 'password' ? <EyeOutlineIcon /> : <EyeOffOutlineIcon />}
          </span>
        </div>
      </div>
    )
  }
)
