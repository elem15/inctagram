import React, { FC } from 'react'

import { InputField, PasswordField } from '@/shared'
import { ControlledInput } from '@/shared/components/controlled/controlled-input/controlled-input'
import { useTranslation } from '@/shared/lib'
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
  // register,
  formState: { errors },
  // isPasswordRequired = false,
  // getValues,
  control,
}) => {
  const { t } = useTranslation()

  return (
    <>
      {/*<InputField*/}
      {/*  {...register('username', {*/}
      {/*    required: `${t.signup.username_required}`,*/}
      {/*    maxLength: {*/}
      {/*      value: 30,*/}
      {/*      message: MaxLength,*/}
      {/*    },*/}
      {/*    minLength: {*/}
      {/*      value: 6,*/}
      {/*      message: MinLength,*/}
      {/*    },*/}
      {/*    pattern: {*/}
      {/*      value: NameValidation,*/}
      {/*      message: NameFormatMessage,*/}
      {/*    },*/}
      {/*  })}*/}
      {/*  label={t.signup.username}*/}
      {/*  placeholder={t.signup.username}*/}
      {/*  helperText={errors.username?.message?.toString()}*/}
      {/*></InputField>*/}
      {/*<InputField*/}
      {/*  {...register('email', {*/}
      {/*    required: `${t.signup.email_required}`,*/}
      {/*    pattern: {*/}
      {/*      value: EmailValidation,*/}
      {/*      message: EmailFormatMessage,*/}
      {/*    },*/}
      {/*  })}*/}
      {/*  label={t.signup.email}*/}
      {/*  placeholder={t.signup.email}*/}
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
      {/*  label={t.signup.password}*/}
      {/*  placeholder={t.signup.password}*/}
      {/*  helperText={errors.password?.message?.toString()}*/}
      {/*></PasswordField>*/}
      {/*<PasswordField*/}
      {/*  {...register('passwordConfirm', {*/}
      {/*    required: `${t.signup.password_required}`,*/}
      {/*    minLength: {*/}
      {/*      value: 6,*/}
      {/*      message: PasswordMinLength,*/}
      {/*    },*/}
      {/*    validate: value => value === getValues('password') || 'The passwords must match',*/}
      {/*  })}*/}
      {/*  label={t.signup.password_confirmation}*/}
      {/*  placeholder={t.signup.password_confirmation}*/}
      {/*  helperText={errors.passwordConfirm?.message?.toString()}*/}
      {/*></PasswordField>*/}
      <ControlledInput
        name="username"
        control={control}
        label={t.signup.username}
        error={errors.username?.message?.toString()}
        placeholder={t.signup.username}
      />
      <ControlledInput
        name="email"
        control={control}
        label={t.signup.email}
        error={errors.email?.message?.toString()}
        placeholder={t.signup.email}
      />
      <ControlledInput
        name="password"
        type="password"
        control={control}
        label={t.signup.password}
        error={errors.password?.message?.toString()}
        placeholder={t.signup.password}
      />
      <ControlledInput
        name="passwordConfirm"
        control={control}
        type="password"
        label={t.signup.password_confirmation}
        error={errors.passwordConfirmation?.message?.toString()}
        placeholder={t.signup.password_confirmation}
      />
    </>
  )
}
