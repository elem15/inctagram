import { FC } from 'react'

import { signIn } from 'next-auth/react'

import styles from './SignUp.module.scss'

import { login, oauthSignIn } from '@/features'
import { Field, PasswordField } from '@/shared'
import { GithubIcon, GoogleIcon } from '@/shared/assets'

export const SignUpWidget: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Sign Up</div>
      <div className={styles.icon}>
        {/* <GoogleIcon onClick={() => login()} /> */}
        {/* <GoogleIcon onClick={() => oauthSignIn()} /> */}
        <GoogleIcon onClick={() => signIn('google')} />
        <a href="">
          <GithubIcon className="fill-light-100" />
        </a>
      </div>
      <form className={styles.form}>
        <Field name="UserName" placeholder="UserName" />
        <Field name="Email" placeholder="Email" />

        <PasswordField name="Password" placeholder="Password" />
        <PasswordField name="Password Confirmation" placeholder="Password Confirmation" />

        <div className={styles.checkbox}>
          <input type="checkbox" id="agree" className=" border-gray-400 rounded" />
          <label htmlFor="agree" className="ml-2 text-sm text-light-100">
            I agree to the <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>
          </label>
        </div>

        <button className="block w-full bg-primary-500   font-semibold text-light-100 p-2 rounded  my-2 ">
          Sign Up
        </button>
        <div className="font-bold text-light-100 text-center">Do you have an account?</div>
        <button className="font-semibold text-primary-500 p-2 bg-transparent w-full">
          Sign In
        </button>
      </form>
    </div>
  )
}
