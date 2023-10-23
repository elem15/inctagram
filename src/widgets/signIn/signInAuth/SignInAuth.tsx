import React, { FC } from 'react'

import { z } from 'zod'

import { InputField, PasswordField } from '@/shared'
import { ControlledInput } from '@/shared/components/controlled/controlled-input/controlled-input'
import { Input } from '@/shared/components/input'
import { useTranslation } from '@/shared/lib'
import { PasswordMaxLength, PasswordMinLength, PasswordValidateMessage } from '@/shared/messages'
import { EmailValidation, PasswordValidation } from '@/shared/regex'
import { IAuthFields } from '@/shared/types'

export const SignInAuth: FC<IAuthFields> = ({ formState: { errors }, control }) => {
  const { t } = useTranslation()

  return (
    <>
      {/*<InputField*/}
      {/*  {...register('email', {*/}
      {/*    required: `${t.signup.email_required}`,*/}
      {/*    pattern: {*/}
      {/*      value: EmailValidation,*/}
      {/*      message: `${t.signup.email_invalid}`,*/}
      {/*    },*/}
      {/*  })}*/}
      {/*  label={t.signin.email}*/}
      {/*  placeholder={t.signin.email}*/}
      {/*  type="email"*/}
      {/*  helperText={errors.email?.message?.toString()}*/}
      {/*></InputField>*/}
      {/*<PasswordField*/}
      {/*  {...register('password', {*/}
      {/*    required: `${t.signup.password_required}`,*/}
      {/*    minLength: {*/}
      {/*      value: 6,*/}
      {/*      message: PasswordMinLength,*/}
      {/*    },*/}
      {/*    maxLength: {*/}
      {/*      value: 20,*/}
      {/*      message: PasswordMaxLength,*/}
      {/*    },*/}
      {/*    pattern: {*/}
      {/*      value: PasswordValidation,*/}
      {/*      message: PasswordValidateMessage,*/}
      {/*    },*/}
      {/*  })}*/}
      {/*  label={t.signin.password}*/}
      {/*  placeholder={t.signin.password}*/}
      {/*  helperText={errors.password?.message?.toString()}*/}
      {/*></PasswordField>*/}
      <ControlledInput
        label={t.signup.email}
        placeholder={t.signup.email}
        error={errors.email?.message?.toString()}
        name="email"
        control={control}
      />
      <ControlledInput
        label={t.signin.password}
        placeholder={t.signin.password}
        type="password"
        error={errors.password?.message?.toString()}
        name="password"
        control={control}
      />
    </>
  )
}
