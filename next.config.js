// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Necesario para 'output: export' con imágenes externas
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