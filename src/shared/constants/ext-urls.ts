const CLIENT_ID = '617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com'

export const AUTH_URLS = {
  GITHUB: 'https://incta.online/api/v1/auth/github/login',
  GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?scope=email profile&include_granted_scopes=true&response_type=code&redirect_uri=http://localhost:3000&client_id=${CLIENT_ID}`,
}
