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

type ProfilePut = Omit<Partial<Profile>, 'id' | 'avatars' | 'createdAt | userName'>

type Avatar = {
  url: string,
  width: number,
  height: number,
  fileSize: number
}

type UserAuthData = {
  profileId?: number,
  accessToken?: string,
  body?: ProfilePut
}

type Country = {
  iso3: string
  country: string
  cities: string[]
}
type City = {
  label: string
  value: string 
}


type SaveAvatarsResponse = {
  avatars: Avatar[];
}

type CountriesResponseData = {
  error: boolean
  msg: string
  data: []
}

type CountriesDataElement = {
  iso2?: string
  iso3: string
  country: string
  cities: string[]
}
