/*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
export function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form')

  form.setAttribute('method', 'GET') // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint)

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {
    client_id: '577523906594-hvdm5h4k4pd6h948692da85qgqh20kq4.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:3000/api/auth/callback/google',
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    include_granted_scopes: 'true',
    state: 'pass-through value',
  }

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input')

    input.setAttribute('type', 'hidden')
    input.setAttribute('name', p)
    input.setAttribute('value', params[p])
    form.appendChild(input)
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form)
  form.submit()
}

export const login = (): void => {
  const CLIENT_ID = '577523906594-hvdm5h4k4pd6h948692da85qgqh20kq4.apps.googleusercontent.com'
  const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/drive.metadata.readonly&response_type=code&redirect_uri=http://localhost:3000&client_id=${CLIENT_ID}`

  window.location.assign(url)
}
