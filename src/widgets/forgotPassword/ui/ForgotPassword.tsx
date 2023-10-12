import { FC, useState } from 'react'

import styles from './ForgotPassword.module.scss'
import { useTranslation } from '@/shared/model'
import { CheckBoxField, InputField } from '@/shared'
import { Captcha } from '@/shared/assets'

export const ForgotPasswordWidget: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>{t.forgotpassword.title}</div>

      <form className={styles.form}>
        <div className="mb-1">
          <InputField label={t.forgotpassword.email} placeholder={t.forgotpassword.email} />
        </div>

        <div className="text-sm text-light-900   mb-4 ">
        {t.forgotpassword.message}
        </div>

        <div className="my-4">
          <button className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded ">
          {t.forgotpassword.send_link}
          </button>
        </div>
        <div className="my-8 ">
          <button className="font-semibold text-primary-500 bg-transparent w-full">
          {t.forgotpassword.back_signin}
          </button>
        </div>

        <div className={styles.captcha}>
          <CheckBoxField text={t.forgotpassword.checkbox_text} />
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
