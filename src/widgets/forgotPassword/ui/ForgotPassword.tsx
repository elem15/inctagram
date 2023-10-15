import { FC, useState } from 'react'

import Link from 'next/link'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import styles from './ForgotPassword.module.scss'

import { useForgotPasswordMutation } from '@/entities/auth/AuthApi'
import { setUser } from '@/entities/auth/AuthSlice'
import { InputField } from '@/shared'
import { useAppDispatch, useTranslation } from '@/shared/model'
import { EmailValidation } from '@/shared/regex'
import { IAuthInput } from '@/shared/types'
import { EmailSentPopUpWidget } from '@/widgets/EmailSentPopUp/ui/EmailSentPopUpWidget'
import { SetPopUp } from '@/widgets/EmailSentPopUp/ui/SetPopUp'

export const ForgotPasswordWidget: FC = () => {
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

  const dispatch = useAppDispatch()

  const [reCaptcha, setReCaptcha] = useState(null)
  const [ForgotPassword, { status, isLoading, isSuccess, isError }] = useForgotPasswordMutation()

  const onSubmit = (data: any) => {
    ForgotPassword({ email: data.email, recaptcha: reCaptcha }).unwrap()
    dispatch(setUser({ email: data.email, user: '' }))
  }

  return (
    <div>
      {isSuccess && (
        <>
          <SetPopUp />
        </>
      )}

      <div className={styles.wrapper}>
        <div className={styles.heading}>{t.forgotpassword.title}</div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className="mb-1">
            <InputField
              {...registerInput('email', {
                required: `${t.signup.email_required}`,
                pattern: {
                  value: EmailValidation,
                  message: `${t.signup.email_invalid}`,
                },
              })}
              label={t.forgotpassword.email}
              placeholder={t.forgotpassword.email}
              type="email"
              helperText={formState.errors.email?.message?.toString()}
            />
          </div>

          <div className="text-sm text-light-900   mb-4 ">{t.forgotpassword.message}</div>

          <div className="my-4">
            <button
              disabled={!(formState.isValid && reCaptcha)}
              className="block w-full bg-primary-500 font-semibold text-light-100 p-2 rounded disabled:opacity-75"
            >
              {t.forgotpassword.send_link}
            </button>
          </div>
          <div className="my-8 flex justify-center">
            <Link href={'/signin'} className="font-semibold text-primary-500 bg-transparent ">
              {t.forgotpassword.back_signin}
            </Link>
          </div>

          <div className={styles.captcha}>
            <ReCAPTCHA
              onChange={(value: any) => setReCaptcha(value)}
              sitekey={process.env.captcha_site_key as string}
              hl={t.forgotpassword.lg}
              theme="dark"
            />
          </div>
        </form>
      </div>
    </div>
  )
}
