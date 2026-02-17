import { BRAND, findSubwayLineName } from '@ahhachul/domain';

type MetadataImage = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type MetadataBase = {
  title: string;
  description: string;
  applicationName?: string;
  keywords?: string[];
  image?: MetadataImage;
  siteUrl?: string;
  pathname?: string;
  locale?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  noFollow?: boolean;
  category?: string;
  rssPath?: string;
  alternatesLanguages?: Record<string, string>;
};

function createMetadataBase(siteUrl?: string) {
  if (!siteUrl) return undefined;

  try {
    return new URL(siteUrl);
  } catch {
    return undefined;
  }
}

function buildCanonical(siteUrl?: string, pathname?: string) {
  if (!siteUrl || !pathname) return undefined;

  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const routePath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  return `${baseUrl}${routePath}`;
}

export function toAbsoluteUrl(siteUrl: string, pathname: string) {
  const normalizedBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  return `${normalizedBase}${normalizedPath}`;
}

function buildRobots(base: Pick<MetadataBase, 'noIndex' | 'noFollow'>) {
  const index = !base.noIndex;
  const follow = !base.noFollow;

  return {
    index,
    follow,
    googleBot: {
      index,
      follow,
      'max-snippet': -1,
      'max-image-preview': 'large' as const,
      'max-video-preview': -1,
    },
  };
}

export function createPageMetadata(base: MetadataBase) {
  const metadataBase = createMetadataBase(base.siteUrl);
  const image = base.image ?? {
    url: BRAND.defaultOgImage,
    width: 800,
    height: 400,
  };
  const canonical = buildCanonical(base.siteUrl, base.pathname);
  const robots = buildRobots(base);
  const rssUrl =
    base.siteUrl && base.rssPath ? toAbsoluteUrl(base.siteUrl, base.rssPath) : undefined;
  const alternates =
    canonical || rssUrl || base.alternatesLanguages
      ? {
          ...(canonical ? { canonical } : {}),
          ...(base.alternatesLanguages ? { languages: base.alternatesLanguages } : {}),
          ...(rssUrl
            ? {
                types: {
                  'application/rss+xml': rssUrl,
                },
              }
            : {}),
        }
      : undefined;

  return {
    ...(metadataBase ? { metadataBase } : {}),
    title: base.title,
    description: base.description,
    applicationName: base.applicationName ?? BRAND.appName,
    ...(base.category ? { category: base.category } : {}),
    ...(base.keywords && base.keywords.length > 0 ? { keywords: base.keywords } : {}),
    openGraph: {
      type: base.type ?? 'website',
      locale: base.locale ?? 'ko_KR',
      siteName: BRAND.appName,
      title: base.title,
      description: base.description,
      images: [{ ...image, alt: image.alt ?? base.title }],
      ...(canonical ? { url: canonical } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: base.title,
      description: base.description,
      images: [image.url],
    },
    ...(alternates ? { alternates } : {}),
    robots,
  };
}

type ListMetadataBase = {
  baseTitle: string;
  baseDescription: string;
  subwayLineId?: string;
  imageBasePath: string;
  siteUrl?: string;
  pathname?: string;
  keywords?: string[];
  category?: string;
  rssPath?: string;
  locale?: string;
  alternatesLanguages?: Record<string, string>;
};

export function createListMetadata(base: ListMetadataBase) {
  const lineName = findSubwayLineName(base.subwayLineId);
  const isLineSpecific = Boolean(lineName);
  const title = isLineSpecific ? `${lineName} ${base.baseTitle}` : base.baseTitle;
  const description = isLineSpecific ? `${lineName} ${base.baseDescription}` : base.baseDescription;
  const imageUrl = isLineSpecific
    ? `${base.imageBasePath}/subway-line-${base.subwayLineId}.png`
    : `${base.imageBasePath}/main.png`;

  return createPageMetadata({
    title,
    description,
    image: {
      url: imageUrl,
      width: 800,
      height: 400,
      alt: title,
    },
    siteUrl: base.siteUrl,
    pathname: base.pathname,
    keywords: base.keywords,
    category: base.category,
    rssPath: base.rssPath,
    locale: base.locale,
    alternatesLanguages: base.alternatesLanguages,
  });
}

type DetailMetadataBase = {
  title: string;
  description: string;
  imageUrl?: string;
  siteUrl?: string;
  pathname?: string;
  keywords?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  category?: string;
  locale?: string;
  alternatesLanguages?: Record<string, string>;
};

export function createDetailMetadata(base: DetailMetadataBase) {
  return createPageMetadata({
    title: base.title,
    description: base.description,
    type: 'article',
    image: {
      url: base.imageUrl ?? BRAND.defaultOgImage,
      width: 800,
      height: 400,
      alt: base.title,
    },
    siteUrl: base.siteUrl,
    pathname: base.pathname,
    keywords: base.keywords,
    noIndex: base.noIndex,
    noFollow: base.noFollow,
    category: base.category,
    locale: base.locale,
    alternatesLanguages: base.alternatesLanguages,
  });
}

type RobotsBase = {
  disallowPaths?: string[];
  allowPaths?: string[];
};

const DEFAULT_DISALLOW_PATHS = ['/login/callback', '/login/set-nickname', '/i/', '/api/'];

export function createRobots(siteUrl: string, base?: RobotsBase) {
  const normalizedSiteUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: base?.allowPaths ?? ['/'],
        disallow: base?.disallowPaths ?? DEFAULT_DISALLOW_PATHS,
      },
    ],
    sitemap: `${normalizedSiteUrl}/sitemap.xml`,
    host: normalizedSiteUrl,
  };
}

export function createSitemapEntries(siteUrl: string, routes: string[]) {
  const normalizedBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const now = new Date();
  const uniqueRoutes = Array.from(new Set(routes));

  return uniqueRoutes.map(route => {
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
    const isHomeRoute = normalizedRoute === '/';

    return {
      url: `${normalizedBase}${normalizedRoute}`,
      lastModified: now,
      changeFrequency: isHomeRoute ? 'daily' : 'hourly',
      priority: isHomeRoute ? 1 : 0.8,
    };
  });
}

type JsonLdObject = Record<string, unknown>;

type WebsiteJsonLdBase = {
  siteUrl: string;
  name: string;
  description: string;
  inLanguage?: string;
  searchPathTemplate?: string;
};

export function createWebsiteJsonLd(base: WebsiteJsonLdBase) {
  const normalizedSiteUrl = base.siteUrl.endsWith('/') ? base.siteUrl : `${base.siteUrl}/`;
  const searchTargetPath = base.searchPathTemplate ?? '/community?q={search_term_string}';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: base.name,
    description: base.description,
    url: normalizedSiteUrl,
    inLanguage: base.inLanguage ?? 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: toAbsoluteUrl(base.siteUrl, searchTargetPath),
      'query-input': 'required name=search_term_string',
    },
  } satisfies JsonLdObject;
}

type OrganizationJsonLdBase = {
  siteUrl: string;
  name: string;
  logoUrl: string;
  sameAs?: string[];
};

export function createOrganizationJsonLd(base: OrganizationJsonLdBase) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: base.name,
    url: base.siteUrl,
    logo: base.logoUrl,
    ...(base.sameAs && base.sameAs.length > 0 ? { sameAs: base.sameAs } : {}),
  } satisfies JsonLdObject;
}

type SiteNavigationItem = {
  name: string;
  url: string;
};

export function createSiteNavigationJsonLd(items: SiteNavigationItem[]) {
  return items.map(item => ({
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: item.name,
    url: item.url,
  })) satisfies JsonLdObject[];
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } satisfies JsonLdObject;
}

export function serializeJsonLd(payload: unknown) {
  return JSON.stringify(payload).replace(/</g, '\\u003c');
}

type SitemapIndexItem = {
  loc: string;
  lastmod?: string | Date;
};

type SitemapUrlItem = {
  loc: string;
  lastmod?: string | Date;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

function toIsoDateString(value?: string | Date) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString();
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function createSitemapIndexXml(items: SitemapIndexItem[]) {
  const rows = items
    .map(item => {
      const lastmod = toIsoDateString(item.lastmod);

      return `<sitemap><loc>${escapeXml(item.loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</sitemap>`;
    })
    .join('');

  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${rows}</sitemapindex>`
  );
}

export function createSitemapXml(items: SitemapUrlItem[]) {
  const rows = items
    .map(item => {
      const lastmod = toIsoDateString(item.lastmod);
      const priority =
        typeof item.priority === 'number' ? `<priority>${item.priority.toFixed(1)}</priority>` : '';

      return (
        `<url><loc>${escapeXml(item.loc)}</loc>` +
        `${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}` +
        `${item.changefreq ? `<changefreq>${item.changefreq}</changefreq>` : ''}` +
        `${priority}</url>`
      );
    })
    .join('');

  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${rows}</urlset>`
  );
}

type RssFeedItem = {
  title: string;
  link: string;
  description: string;
  pubDate?: string | Date;
  guid?: string;
  category?: string;
};

type RssFeedBase = {
  title: string;
  link: string;
  description: string;
  language?: string;
  atomSelfUrl?: string;
  items: RssFeedItem[];
};

function toRfc822Date(value?: string | Date) {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) return undefined;

  return date.toUTCString();
}

export function createRssXml(feed: RssFeedBase) {
  const rows = feed.items
    .map(item => {
      const pubDate = toRfc822Date(item.pubDate);
      const guid = item.guid ?? item.link;

      return (
        `<item>` +
        `<title>${escapeXml(item.title)}</title>` +
        `<link>${escapeXml(item.link)}</link>` +
        `<guid>${escapeXml(guid)}</guid>` +
        `<description>${escapeXml(item.description)}</description>` +
        `${item.category ? `<category>${escapeXml(item.category)}</category>` : ''}` +
        `${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}` +
        `</item>`
      );
    })
    .join('');

  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">` +
    `<channel>` +
    `<title>${escapeXml(feed.title)}</title>` +
    `<link>${escapeXml(feed.link)}</link>` +
    `<description>${escapeXml(feed.description)}</description>` +
    `<language>${escapeXml(feed.language ?? 'ko-KR')}</language>` +
    `${feed.atomSelfUrl ? `<atom:link href="${escapeXml(feed.atomSelfUrl)}" rel="self" type="application/rss+xml" />` : ''}` +
    `${rows}` +
    `</channel>` +
    `</rss>`
  );
}
