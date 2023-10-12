import React, { FC } from 'react'

import { InputField, PasswordField } from '@/shared'
import { PasswordMaxLength, PasswordMinLength, PasswordValidateMessage } from '@/shared/messages'
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
          required: `${t.signup.email_required}`,
          pattern: {
            value: EmailValidation,
            message: `${t.signup.email_invalid}`,
          },
        })}
        label={t.signin.email}
        placeholder={t.signin.email}
        type="email"
        helperText={errors.email?.message?.toString()}
      ></InputField>
      <PasswordField
        {...register('password', {
          required: `${t.signup.password_required}`,
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
        label={t.signin.password}
        placeholder={t.signin.password}
        helperText={errors.password?.message?.toString()}
      ></PasswordField>
    </>
  )
}
