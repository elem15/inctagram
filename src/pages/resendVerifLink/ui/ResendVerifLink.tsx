import styles from './ResendVerifLink.module.scss'

import { TimeManagement } from '@/shared/assets'
import { useTranslation } from '@/shared/model'
import { getHeaderLayout } from '@/widgets/layouts'

const ResendVerifLink = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>{t.resend.title}</div>
      <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>

      <button className="flex justify-center items-center bg-primary-500   font-semibold text-light-100 px-6 py-1.5 rounded  my-8 ">
        Resend verification link
      </button>
      <div>
        <TimeManagement className="w-full h-auto " />
      </div>
    </div>
  )
}

ResendVerifLink.getLayout = getHeaderLayout

export { ResendVerifLink }
