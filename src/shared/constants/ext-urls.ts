const CLIENT_ID = process.env.google_client_id

export const BASE_URL = 'https://incta.online'
export const BACKEND_URL = `${BASE_URL}/api/v1`
export const FRONTEND_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : BASE_URL
export const AUTH_URLS = {
  GITHUB: `${BASE_URL}/api/v1/auth/github/login`,
  GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&response_type=code&redirect_uri=${FRONTEND_URL}&client_id=${CLIENT_ID}`,
}
