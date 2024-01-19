type CountriesDataDict = Record<string, string[]>

type CountriesRTKOutput = {
  countriesDataDict: CountriesDataDict
  countriesWithoutCities: City[]
  responseError: boolean
};

type ImagesUrlData = Record<number, string[]>

type PublicPostCardProps = {
  postId: number
  ownerId: number
  profileImage?: string | StaticImageData
  description: string
  imagesUrl: ImagesUrlData[]
  userName: string
  firstName: string
  lastName: string
  updatedAt: string
}

type PublicPostsResponseData = {
    items: PostDataType[]
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
   userName: string
   description: string
   images: PostImageDTO[]
   owner: Owner
   avatarOwner: string
   updatedAt: string    
  }
