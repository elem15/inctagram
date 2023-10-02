import { useRouter } from 'next/router'

import { en, ru } from '../../locales'

export const useTranslation = () => {
  const router = useRouter()

  const t = router.locale === 'en' ? en : ru

  return { t }
}
