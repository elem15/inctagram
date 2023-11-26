import { FollowingAndFollowersPageMob } from '@/widgets/followingAndFollowersPageMob'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'

const FollowingAndFollowersMobileVersion = () => {
  return (
    <>
      <FollowingAndFollowersPageMob />
    </>
  )
}

FollowingAndFollowersMobileVersion.getLayout = getHeaderWithSidebarLayout
export { FollowingAndFollowersMobileVersion }
