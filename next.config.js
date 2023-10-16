/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
  },
  env: {
    captcha_site_key: process.env.CAPTCHA_SITE_KEY,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
  },
}

module.exports = nextConfig
