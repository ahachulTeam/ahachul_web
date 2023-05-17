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
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
