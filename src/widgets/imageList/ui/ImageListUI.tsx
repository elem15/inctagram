import { ImageCard } from '@/shared/components/imageCard'
import { useTranslation } from '@/shared/lib'

type Props = {
  posts: PostDataToComponent[]
  openModal?: (id: number) => void
}

export const ImageListUI = ({ posts, openModal }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      {posts?.length ? (
        posts.map(({ id, url, description, width, height }) => (
          <ImageCard
            key={id}
            postId={id}
            src={url}
            alt={description}
            width={width}
            height={height}
            openModal={openModal}
          />
        ))
      ) : (
        <div>{t.post_view.no_content}</div>
      )}
    </>
  )
}
