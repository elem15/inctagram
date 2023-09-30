export const login = () => {
  const url = `https://github.com/login/oauth/authorize?client_id=2fd1095481a7b8eded52&scope=user:email`

  window.location.assign(url)
}
