/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["links.papareact.com", "avatars.dicebear.com"],
  },
  env: {
    REACT_APP_STEPZEN_API_KEY: process.env.REACT_APP_STEPZEN_API_KEY,
    REACT_APP_STEPZEN_ENDPOINT: process.env.REACT_APP_STEPZEN_ENDPOINT,
  },
};

module.exports = nextConfig;
