import { FollowingAndFollowersPage } from '../../../widgets/followingAndFollowersPageMob'

import { getHeaderWithSidebarLayout } from '@/widgets/layouts'

const FollowingAndFollowersMobileVersion = () => {
  return <FollowingAndFollowersPage />
}

FollowingAndFollowersMobileVersion.getLayout = getHeaderWithSidebarLayout
export { FollowingAndFollowersMobileVersion }
