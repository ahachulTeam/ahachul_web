export type RouteRedirectRule = {
  from: string;
  to: string;
  permanent: boolean;
};

export type SeoRouteManifestItem = {
  name: string;
  path: string;
  description: string;
  indexable: boolean;
  navigation: boolean;
};

export type SeoSitemapSegment = 'core' | 'community' | 'complaint' | 'lost-found';

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

export const SEO_ROUTE_MANIFEST: SeoRouteManifestItem[] = [
  {
    name: '홈',
    path: '/',
    description: '아하철 메인 홈',
    indexable: true,
    navigation: true,
  },
  {
    name: '커뮤니티',
    path: '/community',
    description: '지하철 커뮤니티 실시간 정보',
    indexable: true,
    navigation: true,
  },
  {
    name: '민원',
    path: '/complaint',
    description: '지하철 민원 접수 및 처리 현황',
    indexable: true,
    navigation: true,
  },
  {
    name: '분실물',
    path: '/lost-found',
    description: '지하철 분실물 및 유실물 찾기',
    indexable: true,
    navigation: true,
  },
  {
    name: '로그인',
    path: '/login',
    description: '아하철 로그인',
    indexable: false,
    navigation: false,
  },
  {
    name: '마이',
    path: '/me',
    description: '개인 대시보드',
    indexable: false,
    navigation: false,
  },
  {
    name: '메시지',
    path: '/messages',
    description: '개인 메시지함',
    indexable: false,
    navigation: false,
  },
  {
    name: '알림',
    path: '/notifications',
    description: '활동 알림',
    indexable: false,
    navigation: false,
  },
];

export const SEO_INDEXABLE_ROUTES: string[] = SEO_ROUTE_MANIFEST.filter(
  route => route.indexable,
).map(route => route.path);

export const SEO_NAVIGATION_LINKS: Array<
  Pick<SeoRouteManifestItem, 'name' | 'path' | 'description'>
> = SEO_ROUTE_MANIFEST.filter(route => route.navigation).map(route => ({
  name: route.name,
  path: route.path,
  description: route.description,
}));

export const SEO_SITEMAP_SEGMENTS: SeoSitemapSegment[] = [
  'core',
  'community',
  'complaint',
  'lost-found',
];

export const SEO_SITEMAP_SEGMENT_PATHS: Record<SeoSitemapSegment, string> = {
  core: '/sitemaps/core.xml',
  community: '/sitemaps/community.xml',
  complaint: '/sitemaps/complaint.xml',
  'lost-found': '/sitemaps/lost-found.xml',
};

export const SEO_FEED_LINKS: Array<{ title: string; path: string }> = [
  { title: '아하철 통합 RSS', path: '/rss.xml' },
  { title: '아하철 커뮤니티 RSS', path: '/community/rss.xml' },
  { title: '아하철 민원 RSS', path: '/complaint/rss.xml' },
  { title: '아하철 분실물 RSS', path: '/lost-found/rss.xml' },
];
