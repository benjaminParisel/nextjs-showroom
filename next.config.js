/** @type {import('next').NextConfig} */
const nextConfig = {
  //avoid twice init of components
  reactStrictMode: false,
  rewrites() {
    return [
      {
        source: '/bonita/:path*',
        destination: `http://localhost:8080/bonita/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
