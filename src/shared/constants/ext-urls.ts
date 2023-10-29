const CLIENT_ID = process.env.google_client_id

// export const BASE_URL = 'https://incta.online'
export const BASE_URL = 'https://inctagram.work'
export const AUTH_URLS = {
  GITHUB: `${BASE_URL}/api/v1/auth/github/login`,
  GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&include_granted_scopes=true&response_type=code&redirect_uri=http://localhost:3000&client_id=${CLIENT_ID}`,
}
