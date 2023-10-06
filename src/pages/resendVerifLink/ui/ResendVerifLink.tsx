import styles from './ResendVerifLink.module.scss'

import { TimeManagement } from '@/shared/assets'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'

const ResendVerifLink = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Email verification link expired</div>
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
