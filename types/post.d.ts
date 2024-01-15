type CountriesDataDict = Record<string, string[]>

type CountriesRTKOutput = {
  countriesDataDict: CountriesDataDict
  countriesWithoutCities: City[]
  responseError: boolean
};

type ImagesUrlData = Record<number, string[]>

type PublicPostCardProps = {
  ownerId: number
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
type Owner = {
  firstName: string
  lastName: string
}
  
 type PostDataType = {
   id: number
   ownerId: number
   description: string
   images: PostImageDTO[]
   owner: Owner
   avatarOwner: string
   updatedAt: string    
  }
