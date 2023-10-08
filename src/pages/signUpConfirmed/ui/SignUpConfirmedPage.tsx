import { FC } from 'react'

import styles from './SignUpConfirmed.module.css'

import { SignUpConfirmImg, OutlinedBellIcon } from '@/shared/assets/'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { useTranslation } from '@/shared/hooks'

const SignUpConfirmedPage = () => {
  const { t } = useTranslation()

  return (
    <div>
      <div className={styles.container}>
        <div>
          <h1 className={styles.heading}>{t.signup_confirm.congratulations}</h1>
          <p className={styles.text}>{t.signup_confirm.confirmed}</p>
          <div className={styles.btnWrapper}>
            <button className={styles.btn}>{t.signup_confirm.sign_in}</button>
          </div>
          <SignUpConfirmImg className={styles.img} />
        </div>
      </div>
    </div>
  )
}

SignUpConfirmedPage.getLayout = getHeaderLayout

export { SignUpConfirmedPage }
