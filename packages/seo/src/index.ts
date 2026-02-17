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
    ...(canonical
      ? {
          alternates: {
            canonical,
          },
        }
      : {}),
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
