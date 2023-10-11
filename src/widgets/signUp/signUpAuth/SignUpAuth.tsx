import React, { FC } from 'react'

import { InputField, PasswordField } from '@/shared'
import {
  EmailFormatMessage,
  MaxLength,
  MinLength,
  NameFormatMessage,
  PasswordMaxLength,
  PasswordMinLength,
  PasswordValidateMessage,
} from '@/shared/messages'
import { EmailValidation, NameValidation, PasswordValidation } from '@/shared/regex'
import { IAuthFields } from '@/shared/types'

export const SignUpAuth: FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
  getValues,
}) => {
  return (
    <>
      <InputField
        {...register('username', {
          required: 'UserName is required',
          maxLength: {
            value: 30,
            message: MaxLength,
          },
          minLength: {
            value: 6,
            message: MinLength,
          },
          pattern: {
            value: NameValidation,
            message: NameFormatMessage,
          },
        })}
        label="Username"
        placeholder="Username"
        helperText={errors.username?.message?.toString()}
      ></InputField>
      <InputField
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: EmailValidation,
            message: EmailFormatMessage,
          },
        })}
        type="email"
        label="Email"
        placeholder="Email"
        // error={errors.password}
        helperText={errors.email?.message?.toString()}
      ></InputField>
      <PasswordField
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: PasswordMinLength,
          },
          maxLength: {
            value: 20,
            message: PasswordMaxLength,
          },
          pattern: {
            value: PasswordValidation,
            message: PasswordValidateMessage,
          },
        })}
        label="Password"
        placeholder="Password"
        helperText={errors.password?.message?.toString()}
      ></PasswordField>
      <PasswordField
        {...register('passwordConfirm', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: PasswordMinLength,
          },
          validate: value => value === getValues('password') || 'The passwords must match',
        })}
        label="Password Confirmation"
        placeholder="Password Confirmation"
        helperText={errors.passwordConfirm?.message?.toString()}
      ></PasswordField>
    </>
  )
}
