import { useRouter } from 'next/router'

import styles from './ResendRegisterLink.module.scss'

import { useResendRegistrationLinkMutation } from '@/entities/auth'
import { TimeManagement } from '@/shared/assets'
import { FRONTEND_URL } from '@/shared/constants/ext-urls'
import { useFetchLoader, useTranslation } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { getHeaderLayout } from '@/widgets/layouts'

const ResendRegisterLink = () => {
  const { t } = useTranslation()
  const [resendRegistrationLink, { isLoading }] = useResendRegistrationLinkMutation()
  const router = useRouter()
  const { email } = useAuth()

  const onSubmit = (email: string) => {
    resendRegistrationLink({ email: email, baseUrl: FRONTEND_URL })
      .unwrap()
      .then(() => {
        router.push('/email-sent')
      })
      .catch(() => router.push('/auth/registration-resend'))
  }

  useFetchLoader(isLoading)

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>{t.resend.title}</div>
      <p>{t.resend.message}</p>

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
