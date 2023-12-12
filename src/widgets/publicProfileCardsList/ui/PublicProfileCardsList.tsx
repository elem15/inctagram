import images from '../data/images'

import { PublicProfileCard } from '@/shared/components/public-profile-card'

export const PublicProfileCardsList = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className=" max-md:flex  max-md:flex-col   sm:flex sm:flex-wrap  gap-x-3 ">
        {Array.from(Array(10).keys()).map((i, key) => {
          return (
            images[i] && (
              <PublicProfileCard
                key={key}
                mainImage={images[i].mainImgURL}
                imagesUrl={images[i].imgURL}
                description={images[i].description}
              />
            )
          )
        })}
      </div>
    </div>
  )
}
