/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
      API_GITHUB: process.env.API_GITHUB
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ]
  }
  // images: {
  //     remotePatterns: [
  //       {
  //         protocol: 'https',
  //         hostname: 'avatars.githubusercontent.com',
  //       },
  //     ],
  //   },
}

module.exports = nextConfig
