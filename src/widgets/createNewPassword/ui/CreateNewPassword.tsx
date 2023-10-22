import { FC } from 'react'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './CreateNewPassword.module.scss'

import { useCreateNewPasswordMutation } from '@/entities/auth'
import { PasswordField } from '@/shared'
import { consoleErrors, useTranslation } from '@/shared/lib'
import { passwordValidation } from '@/shared/regex'
import { IAuthInput } from '@/shared/types'
import { Spinner } from '@/widgets/spinner'

export const CreateNewPasswordWidget: FC = () => {
  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
    getValues,
    formState,
  } = useForm<IAuthInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()
  const router = useRouter()
  const searchParams = useSearchParams()

  const recoveryCode = searchParams?.get('code') as string

  const { t } = useTranslation()

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    createNewPassword({ newPassword: data.password, recoveryCode })
      .unwrap()
      .then(() => {
        router.push('/signin')
      })
      .catch(consoleErrors)
  }

  return (
    <>
      {isLoading && <Spinner />}
      <div className={styles.wrapper}>
        <div className={styles.heading}>{t.password_recovery.title}</div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <PasswordField
            {...registerInput('password', {
              required: t.signup.password_required,
              minLength: {
                value: 6,
                message: t.messages.password_min_length,
              },
              pattern: {
                value: passwordValidation,
                message: t.messages.password_validate_message,
              },
            })}
            label={t.signup.password}
            placeholder={t.signup.password}
            helperText={errors.password?.message?.toString()}
          ></PasswordField>
          <PasswordField
            {...registerInput('passwordConfirm', {
              required: t.signup.password_required,
              minLength: {
                value: 6,
                message: t.messages.password_min_length,
              },
              validate: value =>
                value === getValues('password') || t.messages.password_match_message,
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
    </>
  )
}
