import React, { ReactNode } from 'react'
import s from './CardsDevice.module.scss'
import { Typography } from '@/shared/components'
import { LogOut } from 'lucide-react'
import { format } from 'date-fns'
import { useTranslation } from '@/shared/lib'

type Props = {
  icon: ReactNode
  deviceName: string
  IP: string
  visited?: string
  handleDeleteSession?: () => void
}

export const CardsCurrentDevice = ({ IP, deviceName, icon, visited }: Props) => {
  return (
    <div className={s.cardsDevice}>
      <svg className={s.icon}>{icon}</svg>
      <div className={s.details}>
        <Typography className={s.name} variant={'h3'}>
          {deviceName}
        </Typography>
        <Typography className={s.ip} variant={'small_text'}>
          IP:{IP}
        </Typography>
      </div>
    </div>
  )
}

export const CardsActiveDevice = ({
  IP,
  deviceName,
  icon,
  visited,
  handleDeleteSession,
}: Props) => {
  const lastActiveDate = visited ? new Date(visited) : null
  const formattedDate = lastActiveDate ? format(lastActiveDate, 'yyyy-MM-dd') : ''
  const { t } = useTranslation()
  return (
    <div className={s.cardsDevice}>
      <svg className={s.icon}>{icon}</svg>
      <div className={s.details}>
        <Typography variant="h3" className={s.name}>
          {deviceName}
        </Typography>
        <Typography className={s.ip} variant="small_text">
          IP: {IP}
        </Typography>
        <Typography variant="small_text">Last Active: {formattedDate}</Typography>
      </div>
      <div className={s.button}>
        <LogOut onClick={handleDeleteSession} />
        <Typography>{t.devices.log_out}</Typography>
      </div>
    </div>
  )
}
