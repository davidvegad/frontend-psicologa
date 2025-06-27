// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tumbesfc-media.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**', // Permite cualquier ruta de imagen dentro de este bucket
      },
    ],
  },
};

module.exports = nextConfig;