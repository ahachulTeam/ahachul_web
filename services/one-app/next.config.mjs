/** @type {import('next').NextConfig} */
const nextConfig = {
  telemetry: false,
  reactStrictMode: true,
  webpack(config, options) {
    // SVG 파일을 @svgr/webpack으로 처리
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            typescript: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
