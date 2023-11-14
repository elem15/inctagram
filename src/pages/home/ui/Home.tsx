import Link from 'next/link'

import { Button } from '@/shared/components'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'

function Home() {
  return (
    <div>
      <Button variant="secondary">
        <Link href="/my-profile">Profile Settings</Link>
      </Button>
    </div>
  )
}

Home.getLayout = getHeaderWithSidebarLayout

export { Home }
