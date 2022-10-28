/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  serverRuntimeConfig: {
    jwtSecret: process.env.NEXT_PUBLIC_JWT_SECRET
  },

  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com`,
      `s3.${process.env.NEXT_PUBLIC_AWS_UPLOAD_REGION}.amazonaws.com`,
      `${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_UPLOAD_REGION}.amazonaws.com`,
    ],
  },
}

module.exports = nextConfig
