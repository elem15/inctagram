import { FC, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'

import { SignUpAuth } from '../signUpAuth/SignUpAuth'

import styles from './SignUpWidget.module.scss'

import { AppDispatch } from '@/app/appStore'
import { useRegistrationMutation } from '@/entities/auth'
import { setUser } from '@/entities/auth/model/authSlice'
import { AUTH_URLS } from '@/shared'
import { GithubIcon, GoogleIcon } from '@/shared/assets'
import { Button } from '@/shared/components'
import { consoleErrors, useTranslation } from '@/shared/lib'
import { PasswordMaxLength, PasswordMinLength } from '@/shared/messages'
import { EmailValidation, NameValidation } from '@/shared/regex'
import { IAuthInput } from '@/shared/types'
import { Spinner } from '@/widgets/spinner'

export const SignUpWidget: FC = () => {
  const { t } = useTranslation()

  const schema = z
    .object({
      username: z
        .string()
        .nonempty(t.signup.username_required)
        .regex(NameValidation, 'incorrect format username'),
      email: z
        .string()
        .nonempty(t.signup.email_required)
        .email()
        .regex(EmailValidation, t.signup.email_invalid),
      password: z
        .string()
        .nonempty(t.signup.password_required)
        .min(6, PasswordMinLength)
        .max(20, PasswordMaxLength),
      passwordConfirmation: z
        .string()
        .nonempty(t.signup.password_required)
        .min(6, PasswordMinLength)
        .max(20, PasswordMaxLength),
    })
    .superRefine(({ password, passwordConfirmation }, ctx) => {
      if (passwordConfirmation !== password) {
        ctx.addIssue({
          code: 'custom',
          message: "passwords don't match",
          path: ['confirmPassword'],
        })
      }
    })

  const { handleSubmit, formState, getValues, setError, control } = useForm<IAuthInput>({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const [agree, setAgree] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  const [socialsLoading, setSocialsLoading] = useState(false)

  const [registration, { isLoading, isSuccess, error }] = useRegistrationMutation()

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    dispatch(setUser({ user: data.username, email: data.email }))

    registration({ email: data.email, userName: data.username, password: data.password })
  }

  useEffect(() => {
    isSuccess && router.push('/email-sent')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      consoleErrors(error as Error)
      setError('password', {
        type: 'server',
        message: t.signin.error_message,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <div className={styles.wrapper}>
      {(isLoading || socialsLoading) && <Spinner />}
      <h1 className={styles.heading}>{t.signup.title}</h1>
      <div className={styles.icon}>
        <Link href={AUTH_URLS.GOOGLE} onClick={() => setSocialsLoading(true)}>
          <GoogleIcon />
        </Link>
        <Link href={AUTH_URLS.GITHUB} onClick={() => setSocialsLoading(true)}>
          <GithubIcon className="fill-light-100" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <SignUpAuth
          formState={formState}
          isPasswordRequired
          getValues={getValues}
          control={control}
        />

        <div className={styles.checkbox}>
          <div className="h-6 w-6 flex justify-end items-center">
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={() => setAgree(agree => !agree)}
              className="border-gray-400 rounded accent-white h-5.5 w-5.5"
            />
          </div>
          <label htmlFor="agree" className="text-xs text-light-100 ml-2">
            <span>{t.signup.agreement} </span>
            <a href="#">{t.signup.terms_service}</a>
            <span> {t.signup.and} </span>
            <a href="#">{t.signup.privacy_policy}</a>
          </label>
        </div>
        <Button style={{ marginBottom: '18px' }} fullWidth>
          {t.signup.sign_up}
        </Button>
        {/*<button*/}
        {/*  className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded my-4 disabled:opacity-75"*/}
        {/*  disabled={!(formState.isValid && agree)}*/}
        {/*>*/}
        {/*  {t.signup.sign_up}*/}
        {/*</button>*/}
        <div className="font-base text-light-100 text-center">{t.signup.account_question}</div>
        <div className="text-center mt-3">
          <Link
            href={'/signin'}
            className="font-semibold text-primary-500 p-4 bg-transparent w-full"
          >
            {t.signup.sign_in}
          </Link>
        </div>
      </form>
    </div>
  )
}
