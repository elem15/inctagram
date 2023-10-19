import { useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './SignUpConfirmed.module.css'

import { useRegistrationConfirmationMutation } from '@/entities/auth'
import { useTranslation } from '@/shared/model'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { Spinner } from '@/widgets/spinner'

const SignUpConfirmedPage = () => {
  const [registrationConfirmation, { isLoading }] = useRegistrationConfirmationMutation()
  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    code &&
      registrationConfirmation(code)
        .unwrap()
        .then()
        .catch(() => router.push('/auth/registration-resend'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div>
            <h1 className={styles.heading}>{t.signup_confirm.congratulations}</h1>
            <p className={styles.text}>{t.signup_confirm.confirmed}</p>
            <div className={styles.btnWrapper}>
              <button onClick={() => router.push('/signin')} className={styles.btn}>
                {t.signup_confirm.sign_in}{' '}
              </button>
            </div>
            <Image src="/icons/SignUpConfirm.png" width={432} height={300} alt="sign-up" />
          </div>
        </div>
      )}
    </div>
  )
}

SignUpConfirmedPage.getLayout = getHeaderLayout

export { SignUpConfirmedPage }
