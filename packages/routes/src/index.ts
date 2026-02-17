export type RouteRedirectRule = {
  from: string;
  to: string;
  permanent: boolean;
};

export const LEGACY_EXACT_REDIRECTS: Record<string, string> = {
  '/auth/login': '/login',
  '/auth/callback': '/login/callback',
  '/auth/set-nickname': '/login/set-nickname',
  '/lostFound': '/lost-found',
  '/my': '/me',
  '/notification': '/notifications',
};

export const LEGACY_PREFIX_REDIRECTS: Array<{ from: string; to: string }> = [
  { from: '/lostFound/', to: '/lost-found/' },
  { from: '/my/', to: '/me/' },
  { from: '/notification/', to: '/notifications/' },
];

export const LEGACY_TO_CANONICAL_ROUTES: RouteRedirectRule[] = [
  ...Object.entries(LEGACY_EXACT_REDIRECTS).map(([from, to]) => ({
    from,
    to,
    permanent: true,
  })),
  ...LEGACY_PREFIX_REDIRECTS.flatMap(rule => [
    {
      from: rule.from,
      to: rule.to,
      permanent: true,
    },
    {
      from: `${rule.from}:path*`,
      to: `${rule.to}:path*`,
      permanent: true,
    },
  ]),
];

export const SEO_INDEXABLE_ROUTES: string[] = ['/', '/community', '/complaint', '/lost-found'];
