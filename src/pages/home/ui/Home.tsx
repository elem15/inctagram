import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/shared/components'
import { useGoogleLogin } from '@/shared/lib'
import { useAuth } from '@/shared/lib/hooks/useAuth'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { LogOutButton } from '@/widgets/logOut'
import { Spinner } from '@/widgets/spinner'

function Home() {
  const { isAuth, email } = useAuth()

  const searchParams = useSearchParams()

  const code = searchParams?.get('code') as string | undefined

  const { isLoading, error } = useGoogleLogin(code)

  return (
    <div>
      {isLoading && <Spinner />}
      {error && <div className="text-red-600">Google authorization error</div>}
      <Button variant="secondary">
        <Link href="/my-profile">Profile Settings</Link>
      </Button>
    </div>
  )
}

Home.getLayout = getHeaderWithSidebarLayout

export { Home }
