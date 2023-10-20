import React, { FC } from 'react'

import { InputField, PasswordField } from '@/shared'
import { useTranslation } from '@/shared/lib'
import { EmailValidation, NameValidation, PasswordValidation } from '@/shared/regex'
import { IAuthFields } from '@/shared/types'

export const SignUpAuth: FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
  getValues,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <InputField
        {...register('username', {
          required: `${t.signup.username_required}`,
          maxLength: {
            value: 30,
            message: `${t.messages.user_max_length}`,
          },
          minLength: {
            value: 6,
            message: `${t.messages.user_min_length}`,
          },
          pattern: {
            value: NameValidation,
            message: `${t.messages.name_format_message}`,
          },
        })}
        label={t.signup.username}
        placeholder={t.signup.username}
        helperText={errors.username?.message?.toString()}
      ></InputField>
      <InputField
        {...register('email', {
          required: `${t.signup.email_required}`,
          pattern: {
            value: EmailValidation,
            message: `${t.messages.email_format_message}`,
          },
        })}
        label={t.signup.email}
        placeholder={t.signup.email}
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
        label={t.signup.password}
        placeholder={t.signup.password}
        helperText={errors.password?.message?.toString()}
      ></PasswordField>
      <PasswordField
        {...register('passwordConfirm', {
          required: `${t.signup.password_required}`,
          minLength: {
            value: 6,
            message: `${t.messages.password_min_length}`,
          },
          validate: value =>
            value === getValues('password') || `${t.messages.password_match_message}`,
        })}
        label={t.signup.password_confirmation}
        placeholder={t.signup.password_confirmation}
        helperText={errors.passwordConfirm?.message?.toString()}
      ></PasswordField>
    </>
  )
}
