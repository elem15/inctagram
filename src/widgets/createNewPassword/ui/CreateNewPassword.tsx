import { FC, useEffect } from 'react'

import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './CreateNewPassword.module.scss'

import { useCreateNewPasswordMutation, useValidCodeMutation } from '@/entities/auth/AuthApi'
import { PasswordField } from '@/shared'
import { PasswordMinLength, PasswordValidateMessage } from '@/shared/messages'
import { useTranslation } from '@/shared/model'
import { PasswordValidation } from '@/shared/regex'
import { IAuthFields, IAuthInput } from '@/shared/types'

export const CreateNewPasswordWidget: FC = () => {
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<IAuthInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const [ValidCode] = useValidCodeMutation()

  const [CreateNewPassword, { isError }] = useCreateNewPasswordMutation()
  const router = useRouter()
  const recoveryCode = router.query.code

  useEffect(() => {
    recoveryCode &&
      ValidCode({ recoveryCode: recoveryCode })
        .unwrap()
        .then()
        .catch(() => {
          router.push('/resend')
        })
  }, [router])

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    CreateNewPassword({ newPassword: data.password, recoveryCode })
      .unwrap()
      .then(() => {
        router.push('/signin')
      })
      .catch()
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Create New Password</div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <PasswordField
          {...registerInput('password', {
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
          {...registerInput('passwordConfirm', {
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
        <div className="text-sm text-light-900   mb-4 ">
          Your password must be between 6 and 20 characters
        </div>
        <div className="my-4">
          <button className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded  ">
            Create new password
          </button>
        </div>
      </form>
    </div>
  )
}
