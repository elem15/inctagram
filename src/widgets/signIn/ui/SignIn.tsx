import { FC, useState } from 'react'

import styles from './SignIn.module.scss'

import { Field, PasswordField } from '@/shared'
import { GithubIcon, GoogleIcon } from '@/shared/assets'

export const SignInWidget: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Sign In</div>
      <div className={styles.icon}>
        <a href="">
          <GoogleIcon />
        </a>
        <a href="">
          <GithubIcon className="fill-light-100" />
        </a>
      </div>
      <form className={styles.form}>
        <Field name="Email" placeholder="Email" />

        <PasswordField name="Password" placeholder="Password" />

        <div className="text-sm text-light-900 mt-9 mb-6 text-end">Forgot Password</div>

        <button className="block w-full bg-primary-500   font-semibold text-light-100 p-2 rounded  my-2 ">
          Sign In
        </button>
        <div className="font-bold text-light-100 text-center">{`Don't have an account?`}</div>
        <button className="font-semibold text-primary-500 p-2 bg-transparent w-full">
          Sign Up
        </button>
      </form>
    </div>
  )
}
