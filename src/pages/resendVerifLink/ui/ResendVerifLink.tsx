import Link from 'next/link'

import styles from './ResendVerifLink.module.scss'

import { TimeManagement } from '@/shared/assets'
import { useTranslation } from '@/shared/model'
import { getHeaderLayout } from '@/widgets/layouts'

const ResendVerifLink = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>{t.resend.title}</div>
      <p>{t.resend.message}</p>

      <Link
        href={'/auth/forgotpassword'}
        className="flex justify-center items-center bg-primary-500   font-semibold text-light-100 px-6 py-1.5 rounded  my-8 "
      >
        {t.resend.resend_link}
      </Link>
      <div>
        <TimeManagement className="w-full h-auto " />
      </div>
    </div>
  )
}

ResendVerifLink.getLayout = getHeaderLayout

export { ResendVerifLink }
