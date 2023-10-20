import React, { FC } from 'react'

import { InputField, PasswordField } from '@/shared'
import { useTranslation } from '@/shared/lib'
import { EmailValidation, PasswordValidation } from '@/shared/regex'
import { IAuthFields } from '@/shared/types'

export const SignInAuth: FC<IAuthFields> = ({ register, formState: { errors } }) => {
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
            message: `${t.messages.password_min_length}`,
          },
          maxLength: {
            value: 20,
            message: `${t.messages.password_max_length}`,
          },
          pattern: {
            value: PasswordValidation,
            message: `${t.messages.password_validate_message}`,
          },
        })}
        label={t.signin.password}
        placeholder={t.signin.password}
        helperText={errors.password?.message?.toString()}
      ></PasswordField>
    </>
  )
}
