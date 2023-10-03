import React, { FC } from 'react'

import { InputField, PasswordField } from '@/shared'
import { IAuthFields } from '@/shared/types'

export const SignUpAuth: FC<IAuthFields> = ({
  register,
  formState: { errors },
  isPasswordRequired = false,
}) => {
  return (
    <>
      <InputField
        {...register('username', {
          required: 'UserName is required',
          maxLength: {
            value: 30,
            message: 'Maximum number of characters 30',
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
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'The email must match the format example@xample.com',
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
            message: 'Minimum number of characters 6',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              'Password must contain a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~ ',
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
            message: 'Minimum number of characters 6',
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message:
              'Password must contain a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [  ] ^ _` { | } ~ ',
          },
        })}
        label="Password Confirmation"
        placeholder="Password Confirmation"
        helperText={errors.passwordConfirm?.message?.toString()}
      ></PasswordField>
    </>
  )
}
