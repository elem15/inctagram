import { FC, useEffect } from 'react'

import { useRouter } from 'next/router'

import styles from './SignUpConfirmed.module.css'

import { useRegistrationConfirmationMutation } from '@/entities/auth/AuthApi'
import { SignUpConfirmImg } from '@/shared/assets/'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const SignUpConfirmedPage = () => {
  const [RegistrationConfirmation, { isError }] = useRegistrationConfirmationMutation()
  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    code && RegistrationConfirmation({ confirmationCode: code }).unwrap().then().catch()
  }, [router])

  return (
    <div>
      <div className={styles.container}>
        <div>
          <h1 className={styles.heading}>Congratulations!</h1>
          <p className={styles.text}>Your email has been confirmed</p>
          <div className={styles.btnWrapper}>
            <button onClick={() => router.push('/signin')} className={styles.btn}>
              Sign In
            </button>
          </div>
          <SignUpConfirmImg className={styles.img} />
        </div>
      </div>
    </div>
  )
}

SignUpConfirmedPage.getLayout = getHeaderLayout

export { SignUpConfirmedPage }
