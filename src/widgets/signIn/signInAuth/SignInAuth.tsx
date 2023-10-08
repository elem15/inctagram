import React, { FC } from 'react'

import { InputField, PasswordField } from '@/shared'
import { PasswordMinLength, PasswordValidateMessage } from '@/shared/messages'
import { EmailValidation, PasswordValidation } from '@/shared/regex'
import { IAuthFields } from '@/shared/types'
import { useTranslation } from '@/shared/hooks'

export const SignInAuth: FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
}) => {
  const { t } = useTranslation()
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
        label={t.signin.email}
        placeholder={t.signin.email}
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
        label={t.signin.password}
        placeholder={t.signin.password}
        helperText={errors.password?.message?.toString()}
      ></PasswordField>
    </>
  )
}
