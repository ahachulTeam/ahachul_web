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
  async rewrites() {
    return [
      // auth legacy paths (vite)
      { source: '/auth/login', destination: '/login' },
      { source: '/auth/callback', destination: '/login/callback' },
      { source: '/auth/set-nickname', destination: '/login/set-nickname' },

      // notification legacy paths
      { source: '/notification', destination: '/notifications' },
      { source: '/notification/setting', destination: '/notifications/settings' },

      // my legacy paths
      { source: '/my', destination: '/me' },
      { source: '/my/account', destination: '/me/setting/account' },
      { source: '/my/setting', destination: '/me/setting' },
      { source: '/my/delay-center', destination: '/delay-center' },

      // lost-found legacy paths
      { source: '/lostFound', destination: '/lost-found' },
      { source: '/lostFound/new', destination: '/lost-found/new' },
      { source: '/lostFound/:id', destination: '/lost-found/:id' },
      { source: '/lostFound/:id/edit', destination: '/lost-found/:id/edit' },

      // comments/messages legacy paths
      { source: '/comment/:commentId/edit', destination: '/comments/:commentId/edit' },
      { source: '/comment/:commentId/reply', destination: '/comments/:commentId/reply' },
      { source: '/talk/setting', destination: '/talk/settings' },

      // subway legacy paths
      { source: '/subway/map-page', destination: '/subway/map' },
      { source: '/subway/timeline-page', destination: '/subway/timeline' },
      { source: '/subway/daily-vote-hub-page', destination: '/daily-votes' },

      // user legacy paths
      { source: '/user/:username/setting', destination: '/user/:username/settings' },
      { source: '/user/:username/ProfileOverview', destination: '/user/:username' },
    ];
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
