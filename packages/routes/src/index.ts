export type RouteRedirectRule = {
  from: string;
  to: string;
  permanent: boolean;
};

export const LEGACY_TO_CANONICAL_ROUTES: RouteRedirectRule[] = [
  { from: '/lostFound', to: '/lost-found', permanent: true },
  { from: '/lostFound/:path*', to: '/lost-found/:path*', permanent: true },
  { from: '/auth/login', to: '/login', permanent: true },
  { from: '/auth/callback', to: '/login/callback', permanent: true },
  { from: '/auth/set-nickname', to: '/login/set-nickname', permanent: true },
  { from: '/my', to: '/me', permanent: true },
  { from: '/my/:path*', to: '/me/:path*', permanent: true },
  { from: '/notification', to: '/notifications', permanent: true },
  { from: '/notification/:path*', to: '/notifications/:path*', permanent: true },
];

export const SEO_INDEXABLE_ROUTES: string[] = [
  '/',
  '/community',
  '/complaint',
  '/lost-found',
  '/login',
  '/me',
  '/notifications',
];
