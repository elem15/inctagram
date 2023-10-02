import { FC } from 'react'

import styles from './SignUp.module.scss'

import { Field, PasswordField } from '@/shared'
import { GithubIcon, GoogleIcon } from '@/shared/assets'

export const SignUpWidget: FC = () => {
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
      <form className={styles.form}>
        <Field name="UserName" placeholder="UserName" />
        <Field name="Email" placeholder="Email" />

        <PasswordField name="Password" placeholder="Password" />
        <PasswordField name="Password Confirmation" placeholder="Password Confirmation" />

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
