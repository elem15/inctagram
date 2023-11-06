type Profile = {
  id: number,
  userName: string,
  firstName: string,
  lastName: string,
  city: string,
  dateOfBirth: string,
  aboutMe: string,
  avatars: Avatar[],
  createdAt: string
};

type Avatar = {
  url: string,
  width: number,
  height: number,
  fileSize: number
}

type UserAuthData = {
  profileId?: number,
  accessToken?: string
}
