import { FC, useEffect } from 'react'

import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './CreateNewPassword.module.scss'

import { useCreateNewPasswordMutation, useValidCodeMutation } from '@/entities/auth/AuthApi'
import { PasswordField } from '@/shared'
import { PasswordMinLength, PasswordValidateMessage } from '@/shared/messages'
import { consoleErrors, useTranslation } from '@/shared/model'
import { PasswordValidation } from '@/shared/regex'
import { IAuthFields, IAuthInput } from '@/shared/types'

export const CreateNewPasswordWidget: FC = () => {
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
    getValues,
    formState,
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
      ValidCode({ recoveryCode })
        .unwrap()
        .then()
        .catch(() => {
          router.push('/resend')
        })
  }, [ValidCode, recoveryCode, router])

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    CreateNewPassword({ newPassword: data.password, recoveryCode })
      .unwrap()
      .then(() => {
        router.push('/signin')
      })
      .catch(consoleErrors)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>{t.password_recovery.title}</div>
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
          label={t.signup.password}
          placeholder={t.signup.password}
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
          label={t.signup.password_confirmation}
          placeholder={t.signup.password_confirmation}
          helperText={errors.passwordConfirm?.message?.toString()}
        ></PasswordField>
        <div className="text-sm text-light-900 mb-4">{t.password_recovery.message}</div>
        <div className="my-4">
          <button
            disabled={!formState.isValid}
            className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded disabled:opacity-75"
          >
            {t.password_recovery.title}
          </button>
        </div>
      </form>
    </div>
  )
}
