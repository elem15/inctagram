import { ImageCard } from '@/shared/components/imageCard'

type Props = {
  posts: PostDataToComponent[]
  openModal: (id: number) => void
}

export const ImageListUI = ({ posts, openModal }: Props) => {
  return (
    <>
      {!!posts &&
        posts.length > 0 &&
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
        ))}
    </>
  )
}
