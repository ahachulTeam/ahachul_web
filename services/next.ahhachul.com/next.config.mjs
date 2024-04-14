/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  /** react-spring-bottom-sheet issue */
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
