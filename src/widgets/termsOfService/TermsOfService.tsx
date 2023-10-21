import { FC } from 'react'

import s from './TermsOfService.module.scss'

import { BackIcon } from '@/shared/assets/icons/BackIcon'
import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
type Props = {
  onBackToSignUpClick: () => void
}
export const TermsOfService: FC<Props> = ({ onBackToSignUpClick }) => {
  const { t } = useTranslation()

  return (
    <div>
      <div className={s.backButtonContainer}>
        <Typography variant={'regular_link'} onClick={onBackToSignUpClick} className={s.link}>
          <BackIcon /> {t.terms_of_service.button_text}
        </Typography>
      </div>

      <div>
        <div className={s.title}>
          <Typography variant={'h1'}>{t.terms_of_service.title}</Typography>
        </div>
        <div className={s.textContainer}>
          <Typography variant={'regular_text_14'}>{t.terms_of_service.text}</Typography>
        </div>
      </div>
    </div>
  )
}
