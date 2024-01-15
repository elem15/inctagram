type PostsQuery = {
  userId: number,
  postId?: number,
}
type PostImage={
  croppedAreaPixels: {width: number, height: number, x: number, y: number}
  id:string
  image:string

}
type PostDataToComponent = {
  id: number,
  url: string,
  description: string,
  width: number,
  height: number;
}

type PostsData = {
  totalCount: number,
  pageSize: number,
  items: PostDataItem[],
  totalUsers: number
}

type PostImageDTO = {
  url: string,
  width: number,
  height: number,
  fileSize: number,
  uploadId: string
}

type PostDataItem = {
  id: number,
  ownerId: number,
  description: string,
  location: string,
  images: PostImageDTO[],
  createdAt: string,
  updatedAt: string,
  avatarOwner:string,
  owner: {
    firstName: string,
    lastName: string,
  }
}
