import React, { FC } from 'react'

import { InputField, PasswordField } from '@/shared'
import { PasswordMinLength, PasswordValidateMessage } from '@/shared/messages'
import { EmailValidation, PasswordValidation } from '@/shared/regex'
import { IAuthFields } from '@/shared/types'

export const SignInAuth: FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
}) => {
  return (
    <>
      <InputField
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: EmailValidation,
            message: 'Email is invalid ',
          },
        })}
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
          pattern: {
            value: PasswordValidation,
            message: PasswordValidateMessage,
          },
        })}
        label="Password"
        placeholder="Password"
        helperText={errors.password?.message?.toString()}
      ></PasswordField>
    </>
  )
}
