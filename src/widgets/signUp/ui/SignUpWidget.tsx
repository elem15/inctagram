import { FC, useState } from 'react'

import { FormState, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { SignUpAuth } from '../signUpAuth/SignUpAuth'

import styles from './SignUpWidget.module.scss'

import { AppDispatch } from '@/app/appStore'
import { signUpUser } from '@/entities/auth/AuthSlice'
import { InputField, PasswordField } from '@/shared'
import { GithubIcon, GoogleIcon } from '@/shared/assets'
import { IAuthFields, IAuthInput } from '@/shared/types'

export const SignUpWidget: FC = () => {
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

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    dispatch(signUpUser({ email: data.email, userName: data.username, password: data.password }))
    reset()
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Sign Up</h1>
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
          <input type="checkbox" id="agree" className=" border-gray-400 rounded accent-white" />
          <label htmlFor="agree" className="ml-2 text-xs  text-light-100">
            I agree to the <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>
          </label>
        </div>

        <button className="block w-full bg-primary-500   font-semibold text-light-100 p-2 rounded  my-4 ">
          Sign Up
        </button>
        <div className="font-base text-light-100 text-center">Do you have an account?</div>
        <button className="font-semibold text-primary-500 p-4 bg-transparent w-full">
          Sign In
        </button>
      </form>
    </div>
  )
}
