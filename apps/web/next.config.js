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
