/** @type {import('next').NextConfig} */
const nextConfig = {
  //avoid twice init of components
  reactStrictMode: false,
  env: {
    BONITA_URL: process.env.BONITA_URL,
    BONITA_USERNAME: process.env.BONITA_USERNAME,
    BONITA_PASSWORD: process.env.BONITA_PASSWORD,
  },
};

module.exports = nextConfig;
