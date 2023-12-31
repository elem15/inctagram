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

type PublicProfile = Omit<Profile, 'firstName' | 'lastName' | 'city' | 'dateOfBirth'>

type ProfilePut = Omit<Partial<Profile>, 'id' | 'avatars' | 'createdAt | userName'>

type PublicProfileQuery = {
  profileId: string
}
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

type CountriesDataDict = Record<string, string[]>

type CountriesRTKOutput = {
  countriesDataDict: CountriesDataDict
  countriesWithoutCities: City[]
  responseError: boolean
};
