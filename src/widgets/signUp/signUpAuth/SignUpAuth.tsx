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
import { useTranslation } from '@/shared/model'
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
        label={t.signup.username}
        placeholder={t.signup.username}
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
        label={t.signup.email}
        placeholder={t.signup.email}
        type="email"
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
        label={t.signup.password}
        placeholder={t.signup.password}
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
        label={t.signup.password_confirmation}
        placeholder={t.signup.password_confirmation}
        helperText={errors.passwordConfirm?.message?.toString()}
      ></PasswordField>
    </>
  )
}
