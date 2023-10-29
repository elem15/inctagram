import { FC } from 'react'

import s from './MyProfile.module.scss'

import { useTranslation } from '@/shared/lib'
type Props = {}
export const MyProfile: FC<Props> = () => {
  const { t } = useTranslation()

  return <div className={s.container}></div>
}
