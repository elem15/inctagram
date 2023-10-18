import { FC, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { SignInAuth } from '../signInAuth/SignInAuth'

import styles from './SignInWidget.module.scss'

import { useLoginMutation } from '@/entities/auth/authApi'
import { AUTH_URLS } from '@/shared'
import { GithubIcon, GoogleIcon } from '@/shared/assets'
import { useTranslation } from '@/shared/model'
import { IAuthInput } from '@/shared/types'
import { Spinner } from '@/widgets/spinner'

export const SignInWidget: FC = () => {
  const [socialsLoading, setSocialsLoading] = useState(false)

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
  const [Login, { isLoading, error, isSuccess }] = useLoginMutation()
  const router = useRouter()

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    Login({ email: data.email, password: data.password })
  }

  useEffect(() => {
    isSuccess && router.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    error &&
      setError('password', {
        type: 'server',
        message: t.signin.error_message,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <div className={styles.wrapper}>
      {(isLoading || socialsLoading) && <Spinner />}
      <h1 className={styles.heading}>{t.signin.title}</h1>
      <div className={styles.icon}>
        <Link href={AUTH_URLS.GOOGLE} onClick={() => setSocialsLoading(true)}>
          <GoogleIcon />
        </Link>
        <Link href={AUTH_URLS.GITHUB} onClick={() => setSocialsLoading(true)}>
          <GithubIcon className="fill-light-100" />
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <SignInAuth formState={formState} register={registerInput} getValues={getValues} />

        <div className="mt-9 mb-6 text-end">
          <Link href={'/auth/forgotpassword'} className="text-sm text-light-900 ">
            {t.signin.forgot_password}
          </Link>
        </div>

        <button
          type="submit"
          className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded my-4 disabled:opacity-75"
          disabled={!formState.isValid}
        >
          {t.signin.sign_in}
        </button>
        <div className="font-base text-light-100 text-center">{t.signin.account_question}</div>
        <div className="text-center mt-3">
          <Link
            href={'/signup'}
            className="font-semibold text-primary-500 p-4 bg-transparent w-full"
          >
            {t.signin.sign_up}
          </Link>
        </div>
      </form>
    </div>
  )
}
