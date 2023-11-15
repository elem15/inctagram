import { useEffect } from 'react'

import { useRouter } from 'next/router'

export default function Document() {
  const router = useRouter()

  useEffect(() => {
    router.push('/my-profile/general-information')
  })

  return null
}
