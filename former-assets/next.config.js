/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  compiler: {
    emotion: true,
  },
  experimental: {
    appDir: false,
    forceSwcTransforms: true,
  },
  swcMinify: true,
  transpilePackages: ["react-hotjar"],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
