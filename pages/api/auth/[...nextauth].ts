import NextAuth from 'next-auth'

import { authConfig } from '@/shared/api/common/auth/authConfig'

export default NextAuth(authConfig)
