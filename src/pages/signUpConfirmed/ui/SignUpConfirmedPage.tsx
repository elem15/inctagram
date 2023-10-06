import { FC } from 'react'

import styles from './SignUpConfirmed.module.css'

import { SignUpConfirmImg, OutlinedBellIcon, FlagUnitedKingdom } from '@/shared/assets/'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const SignUpConfirmedPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <div>
          <h1 className={styles.heading}>Congratulations!</h1>
          <p className={styles.text}>Your email has been confirmed</p>
          <div className={styles.btnWrapper}>
            <button className={styles.btn}>Sign In</button>
          </div>
          <SignUpConfirmImg className={styles.img} />
        </div>
      </div>
    </div>
  )
}

SignUpConfirmedPage.getLayout = getHeaderLayout

export { SignUpConfirmedPage }
