/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
    turbo: {
      rules: {},
    },
  },
};

export default nextConfig;
