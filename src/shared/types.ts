import { InputHTMLAttributes } from 'react'

import { FormState, UseFormRegister } from 'react-hook-form'

interface IInputField {
  label: string
  placeholder: string
  helperText?: string | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IInputField

export interface IField extends TypeInputPropsField {}

export interface IAuthFields {
  register: UseFormRegister<any>
  formState: FormState<any>
  isPasswordRequired?: boolean
}

export interface IAuthInput {
  username: string
  email: string
  password: string
}
