import { useRouter } from 'next/router'

import styles from './ResendRegisterLink.module.scss'

import { useResendRegistrationLinkMutation } from '@/entities/auth/AuthApi'
import { TimeManagement } from '@/shared/assets'
import { useTranslation } from '@/shared/model'
import { useAuth } from '@/shared/model/hooks/useAuth'
import { getHeaderLayout } from '@/widgets/layouts'

const ResendRegisterLink = () => {
  const { t } = useTranslation()
  const [resendRegistrationLink, { isError, isLoading }] = useResendRegistrationLinkMutation()
  const router = useRouter()
  const { email } = useAuth()

  const onSubmit = (email: string) => {
    resendRegistrationLink({ email: email, baseUrl: 'http://localhost:3000' })
      .unwrap()
      .then(() => {
        router.push('/email')
      })
      .catch(() => router.push('/auth/registration-resend'))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>{t.resend.title}</div>
      <p>
        {t.resend.message} {email}
      </p>

      <button
        onClick={() => onSubmit(email as string)}
        className="flex justify-center items-center bg-primary-500   font-semibold text-light-100 px-6 py-1.5 rounded  my-8 "
      >
        {t.resend.resend_link}
      </button>
      <div>
        <TimeManagement className="w-full h-auto " />
      </div>
    </div>
  )
}

ResendRegisterLink.getLayout = getHeaderLayout

export { ResendRegisterLink }
