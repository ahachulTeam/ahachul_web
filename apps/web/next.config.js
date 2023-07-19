/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  experimental: {
    appDir: false,
    forceSwcTransforms: true,
  },
  swcMinify: true,
  transpilePackages: ['react-hotjar', '@ahhachul/ui'],
  images: {
    domains: ['ahachul-image.s3.ap-northeast-2.amazonaws.com'],
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
