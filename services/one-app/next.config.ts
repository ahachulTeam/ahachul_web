const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    loader: 'default',
    formats: ['image/avif', 'image/webp'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  webpack(
    config: any,
    { isServer, nextRuntime }: { isServer: boolean; nextRuntime?: 'nodejs' | 'edge' },
  ) {
    const alias = { ...(config.resolve.alias ?? {}) } as Record<string, false | string>;

    if (isServer) {
      alias['msw/browser'] = false;
    }

    if (!isServer || nextRuntime === 'edge') {
      alias['msw/node'] = false;
    }

    config.resolve.alias = {
      ...alias,
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            typescript: true,
            exportType: 'named',
            namedExport: 'ReactComponent',
          },
        },
      ],
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
