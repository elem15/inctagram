import { FC } from 'react'

import styles from './CreateNewPassword.module.scss'

import { PasswordField } from '@/shared'
import { PasswordMinLength, PasswordValidateMessage } from '@/shared/messages'
import { PasswordValidation } from '@/shared/regex'
import { IAuthFields } from '@/shared/types'

export const CreateNewPasswordWidget: FC<IAuthFields> = ({
  register,
  formState: { errors },
  getValues,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Create New Password</div>
      <form className={styles.form}>
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
        <PasswordField
          {...register('passwordConfirm', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: PasswordMinLength,
            },
            validate: value => value === getValues('password') || 'The passwords must match',
          })}
          label="Password Confirmation"
          placeholder="Password Confirmation"
          helperText={errors.passwordConfirm?.message?.toString()}
        ></PasswordField>
        <div className="my-4">
          <button className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded  ">
            Send Link
          </button>
        </div>
      </form>
    </div>
  )
}
