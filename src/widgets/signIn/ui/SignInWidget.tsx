import { access } from 'fs'

import { FC, useState } from 'react'

import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { SignInAuth } from '../signInAuth/SignInAuth'

import styles from './SignInWidget.module.scss'

import { AppDispatch } from '@/app/appStore'
import { useLoginMutation } from '@/entities/auth/AuthApi'
import { setLoginUser } from '@/entities/auth/AuthSlice'
import { GithubIcon, GoogleIcon } from '@/shared/assets'
import { IAuthInput } from '@/shared/types'

export const SignInWidget: FC = () => {
  const {
    register: registerInput,
    handleSubmit,
    formState,
    getValues,
    reset,
  } = useForm<IAuthInput>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const dispatch = useDispatch<AppDispatch>()
  const [Login, { status }] = useLoginMutation()
  const router = useRouter()

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    Login({ email: data.email, password: data.password })
      .unwrap()
      .then(payload => {
        dispatch(setLoginUser({ email: data.email, accessToken: payload.accessToken })),
          router.push('/')
      })
      .catch()
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Sign In</h1>
      <div className={styles.icon}>
        <a href="">
          <GoogleIcon />
        </a>
        <a href="">
          <GithubIcon className="fill-light-100" />
        </a>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <SignInAuth
          formState={formState}
          register={registerInput}
          isPasswordRequired
          getValues={getValues}
        />

        <div className="text-sm text-light-900 mt-9 mb-6 text-end">Forgot Password</div>

        <button
          type="submit"
          className="block w-full bg-primary-500   font-semibold text-light-100 p-2 rounded  my-4 "
        >
          Sign In
        </button>
        <div className="font-base text-light-100 text-center">{`Don't have an account?`}</div>
        <button className="font-semibold text-primary-500 p-4 bg-transparent w-full">
          Sign Up
        </button>
      </form>
    </div>
  )
}
