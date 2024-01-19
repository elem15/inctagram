import { GetServerSideProps } from 'next'

import { BACKEND_URL } from '@/shared/constants/ext-urls'
import { ImageListWidgetSSR } from '@/widgets/imageListSSR'
import { getHeaderLayout } from '@/widgets/layouts/header-layout/HeaderLayout'
import { ProfileHeaderWeb } from '@/widgets/profileHeader'

export const PublicPosts = ({ data }: { data: PublicProfile }) => {
  return (
    <div className="w-full mx-12 mt-6 mb-12">
      <ProfileHeaderWeb data={data} />
      <ImageListWidgetSSR userId={data.id} />
    </div>
  )
}

PublicPosts.getLayout = getHeaderLayout

export const getServerSideProps: GetServerSideProps = async ctx => {
  var profileId = ctx.query.ownerId
  const res = await fetch(`${BACKEND_URL}/public-user/profile/${profileId}`)
  const data: PublicProfile = await res.json()

  return { props: { data } }
}
