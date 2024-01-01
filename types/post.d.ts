type CountriesDataDict = Record<string, string[]>

type CountriesRTKOutput = {
  countriesDataDict: CountriesDataDict
  countriesWithoutCities: City[]
  responseError: boolean
};

type ImagesUrlData = Record<number, string[]>

type PublicPostCardProps = {
  ownerId: string
  profileImage?: string | StaticImageData
  description: string
  imagesUrl: ImagesUrlData[]
  firstName: string
  lastName: string
  updatedAt: string
}

type PublicPostsResponseData = {
    items: []
    totalCount: number
    pageSize: number
    totalUsers: number
  }
  
 type PostDataType = {
    id: number
    ownerId: string
    description: string
    images: []
    owner: Record<string, string>
    avatarOwner: string
    updatedAt: string
  }
