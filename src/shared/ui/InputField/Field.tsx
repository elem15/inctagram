import { InputHTMLAttributes, forwardRef } from 'react'

import styles from './InputField.module.scss'

interface IInputField {
  name: string
  placeholder: string
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IInputField

export interface IField extends TypeInputPropsField {}

export const Field = forwardRef<HTMLInputElement, IField>(
  ({ placeholder, name, type = 'text', style, ...rest }, ref) => {
    return (
      <div className={styles.wrapper} style={style}>
        <label>{name}</label>
        <input ref={ref} type={type} {...rest} placeholder={placeholder} />
      </div>
    )
  }
)
