/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  serverRuntimeConfig: {
    jwtSecret: process.env.NEXT_PUBLIC_JWT_SECRET
  }
}

module.exports = nextConfig
