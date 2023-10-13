import { FC, useState } from 'react'

import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { SignUpAuth } from '../signUpAuth/SignUpAuth'

import styles from './SignUpWidget.module.scss'

import { AppDispatch } from '@/app/appStore'
import { useRegistrationMutation } from '@/entities/auth/AuthApi'
import { setUser } from '@/entities/auth/AuthSlice'
import { GithubIcon, GoogleIcon } from '@/shared/assets'
import { useTranslation } from '@/shared/model'
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

  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  const [Registration, { isLoading }] = useRegistrationMutation()

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    dispatch(setUser({ user: data.username, email: data.email }))

    Registration({ email: data.email, userName: data.username, password: data.password })
      .unwrap()
      .then(() => router.push('/email'))
      .catch(error => {
        if ('data' in error) {
          const errMsg = error.data as ErrorDataType

          if ('messages' in errMsg) {
            console.error(errMsg.messages)
            setError('email', {
              type: 'server',
              message: t.signup.user_exist_error,
            })
          }
        }
      })
  }
  const { t } = useTranslation()

  const [agree, setAgree] = useState(false)

  return (
    <div className={styles.wrapper}>
      {isLoading && <Spinner />}
      <h1 className={styles.heading}>{t.signup.title}</h1>
      <div className={styles.icon}>
        <a href="">
          <GoogleIcon />
        </a>
        <a href="">
          <GithubIcon className="fill-light-100" />
        </a>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <SignUpAuth
          formState={formState}
          register={registerInput}
          isPasswordRequired
          getValues={getValues}
        />

        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={() => setAgree(agree => !agree)}
            className="border-gray-400 rounded accent-white h-6 w-6"
          />
          <label htmlFor="agree" className="ml-2 text-xs  text-light-100">
            {t.signup.agreement} <a href="">{t.signup.terms_service}</a> {t.signup.and}{' '}
            <a href="">{t.signup.privacy_policy}</a>
          </label>
        </div>
        <button
          className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded my-4 disabled:opacity-75"
          disabled={!(formState.isValid && agree)}
        >
          {t.signup.sign_up}
        </button>
        <div className="font-base text-light-100 text-center">{t.signup.account_question}</div>
        <button className="font-semibold text-primary-500 p-4 bg-transparent w-full">
          {t.signup.sign_in}
        </button>
      </form>
    </div>
  )
}
