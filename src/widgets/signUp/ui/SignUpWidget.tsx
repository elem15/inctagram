import { FC, useState } from 'react'

import { FormState, SubmitHandler, UseFormRegister, useForm } from 'react-hook-form'

import { SignUpAuth } from '../signUpAuth/SignUpAuth'

import styles from './SignUpWidget.module.scss'

import { InputField, PasswordField } from '@/shared'
import { GithubIcon, GoogleIcon } from '@/shared/assets'
import { IAuthFields, IAuthInput } from '@/shared/types'

export const SignUpWidget: FC<IAuthFields> = () => {
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

  const onSubmit: SubmitHandler<IAuthInput> = () => {
    reset()
  }

  const [agree, setAgree] = useState(false)

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
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={() => setAgree(agree => !agree)}
            className="border-gray-400 rounded accent-white h-6 w-6"
          />
          <label htmlFor="agree" className="ml-2 text-xs  text-light-100">
            I agree to the <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>
          </label>
        </div>

        <button
          className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded my-4 disabled:opacity-75"
          disabled={!(formState.isValid && agree)}
        >
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
