import { FC, useState } from 'react'

import styles from './ForgotPassword.module.scss'

import { CheckBoxField, Field } from '@/shared'
import { Captcha } from '@/shared/assets'

export const ForgotPasswordWidget: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Forgot Password</div>

      <form className={styles.form}>
        <div className="mb-1">
          <Field name="Email" placeholder="Email" />
        </div>

        <div className="text-sm text-light-900   mb-4 ">
          Enter your email address and we will send you further instructions
        </div>

        <div className="my-4">
          <button className="block w-full bg-primary-500   font-semibold text-light-100 p-2 rounded  ">
            Send Link
          </button>
        </div>
        <div className="my-8 ">
          <button className="font-semibold text-primary-500 bg-transparent w-full">
            Back to Sign In
          </button>
        </div>

        <div className={styles.captcha}>
          <CheckBoxField text={`I'm not a robot`} />
          <div className="flex flex-col  items-center">
            <Captcha className="mb-1" />
            <span>reCAPTCHA</span>
            <span>Privacy - Terms</span>
          </div>
        </div>
      </form>
    </div>
  )
}
