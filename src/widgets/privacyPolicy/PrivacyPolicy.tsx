import { FC } from 'react'

import { useSearchParams } from 'next/navigation'

import { BackIcon } from '@/shared/assets/icons/BackIcon'
import { Typography } from '@/shared/components'
import { useTranslation } from '@/shared/lib'
import s from '@/widgets/termsOfService/TermsOfService.module.scss'
type Props = {
  onBackToSignUpClick: () => void
}
export const PrivacyPolicy: FC<Props> = ({ onBackToSignUpClick }) => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const from = searchParams?.get('from')

  return (
    <div className={s.container}>
      <div className={s.backButtonContainer}>
        <Typography variant={'regular_link'} onClick={onBackToSignUpClick} className={s.link}>
          <BackIcon />{' '}
          {from ? t.terms_of_service.button_to_profile : t.terms_of_service.button_text}
        </Typography>
      </div>

      <div>
        <div className={s.title}>
          <Typography variant={'h1'}>{t.privacy_policy.title}</Typography>
        </div>
        <div className={s.textContainer}>
          <ol style={{ listStyle: 'number' }}>
            {t.privacy_policy.text.map((text, index) => (
              <li key={index} className={s.text}>
                {text}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
