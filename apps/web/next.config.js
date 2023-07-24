/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    appDir: false,
    forceSwcTransforms: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  transpilePackages: ['react-hotjar', '@ahhachul/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ahachul-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['www.lost112.go.kr'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
