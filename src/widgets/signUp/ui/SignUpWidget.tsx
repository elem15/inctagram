import { FC, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { SignUpAuth } from '../signUpAuth/SignUpAuth'

import styles from './SignUpWidget.module.scss'

import { AppDispatch } from '@/app/appStore'
import { useRegistrationMutation } from '@/entities/auth'
import { setUser } from '@/entities/auth/model/authSlice'
import { AUTH_URLS } from '@/shared'
import { GithubIcon, GoogleIcon } from '@/shared/assets'
import { SuperCheckbox } from '@/shared/components'
import { consoleErrors, useTranslation } from '@/shared/lib'
import { IAuthInput } from '@/shared/types'
import { Spinner } from '@/widgets/spinner'

export const SignUpWidget: FC = () => {
  const {
    register: registerInput,
    handleSubmit,
    formState,
    getValues,
    setError,
  } = useForm<IAuthInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const { t } = useTranslation()

  const [agree, setAgree] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const router = useRouter()

  const [socialsLoading, setSocialsLoading] = useState(false)

  const [registration, { isLoading, isSuccess, error }] = useRegistrationMutation()

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    dispatch(setUser({ userName: data.username, email: data.email }))

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
          register={registerInput}
          isPasswordRequired
          getValues={getValues}
        />

        <div className={styles.checkbox}>
          <SuperCheckbox checked={agree} onCheckedChange={() => setAgree(agree => !agree)} />
          <label htmlFor="agree" className="text-xs text-light-100">
            <span>{t.signup.agreement} </span>
            <Link href="auth/terms-of-service">{t.signup.terms_service}</Link>
            <span> {t.signup.and} </span>
            <Link href="auth/privacy">{t.signup.privacy_policy}</Link>
          </label>
        </div>
        <button
          className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded my-4 disabled:opacity-75"
          disabled={!(formState.isValid && agree)}
        >
          {t.signup.sign_up}
        </button>
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
