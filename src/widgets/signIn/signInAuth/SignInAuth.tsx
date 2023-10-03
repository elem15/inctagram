import React, { FC } from 'react'

import { FormState, UseFormRegister } from 'react-hook-form'

import { InputField, PasswordField } from '@/shared'
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
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
    </>
  )
}
