/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
          options: {
            svgo: true,
            typescript: true,
          },
        },
      },
    },
  },
};

export default nextConfig;
