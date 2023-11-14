import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/shared/components'
import { useGoogleLogin, useTranslation } from '@/shared/lib'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { Spinner } from '@/widgets/spinner'

function Home() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()

  const code = searchParams?.get('code') as string | undefined

  const { isLoading, error } = useGoogleLogin(code)

  return (
    <div>
      {isLoading && <Spinner />}
      {error && <div className="text-red-600">Google authorization error</div>}
      <Button variant="secondary">
        <Link href="/my-profile">{t.home.profile_btn}</Link>
      </Button>
    </div>
  )
}

Home.getLayout = getHeaderWithSidebarLayout

export { Home }
