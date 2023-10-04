import { InputHTMLAttributes } from 'react'

import {
  FormState,
  SubmitHandler,
  UseFormGetValues,
  UseFormRegister,
  UseFormReturn,
  UseFormWatch,
} from 'react-hook-form'

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
  getValues: UseFormGetValues<any>
}

export interface IAuthInput {
  username: string
  email: string
  password: string
}
