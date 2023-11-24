import { FollowingAndFollowersPage } from '@/widgets/followingAndFollowersPageMob'
import { getHeaderWithSidebarLayout } from '@/widgets/layouts'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

const FollowingAndFollowersMobileVersion = () => {
  return (
    <>
      {/*<ProfileHeaderWeb />*/}
      <FollowingAndFollowersPage />
    </>
  )
}

FollowingAndFollowersMobileVersion.getLayout = getHeaderWithSidebarLayout
export { FollowingAndFollowersMobileVersion }
