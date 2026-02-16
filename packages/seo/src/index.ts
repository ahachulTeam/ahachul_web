import { BRAND, findSubwayLineName } from '@ahhachul/domain';

type MetadataImage = {
  url: string;
  width?: number;
  height?: number;
};

type MetadataBase = {
  title: string;
  description: string;
  applicationName?: string;
  keywords?: string[];
  image?: MetadataImage;
  siteUrl?: string;
  pathname?: string;
};

function buildCanonical(siteUrl?: string, pathname?: string) {
  if (!siteUrl || !pathname) return undefined;

  const baseUrl = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const routePath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  return `${baseUrl}${routePath}`;
}

export function createPageMetadata(base: MetadataBase) {
  const image = base.image ?? {
    url: BRAND.defaultOgImage,
    width: 800,
    height: 400,
  };
  const canonical = buildCanonical(base.siteUrl, base.pathname);

  return {
    title: base.title,
    description: base.description,
    applicationName: base.applicationName ?? BRAND.appName,
    ...(base.keywords ? { keywords: base.keywords.join(', ') } : {}),
    openGraph: {
      title: base.title,
      description: base.description,
      images: [image],
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
  };
}

type ListMetadataBase = {
  baseTitle: string;
  baseDescription: string;
  subwayLineId?: string;
  imageBasePath: string;
  siteUrl?: string;
  pathname?: string;
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
    },
    siteUrl: base.siteUrl,
    pathname: base.pathname,
  });
}

type DetailMetadataBase = {
  title: string;
  description: string;
  imageUrl?: string;
  siteUrl?: string;
  pathname?: string;
};

export function createDetailMetadata(base: DetailMetadataBase) {
  return createPageMetadata({
    title: base.title,
    description: base.description,
    image: {
      url: base.imageUrl ?? BRAND.defaultOgImage,
      width: 800,
      height: 400,
    },
    siteUrl: base.siteUrl,
    pathname: base.pathname,
  });
}

export function createRobots(siteUrl: string) {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

export function createSitemapEntries(siteUrl: string, routes: string[]) {
  const normalizedBase = siteUrl.endsWith('/') ? siteUrl.slice(0, -1) : siteUrl;
  const now = new Date();

  return routes.map(route => {
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;

    return {
      url: `${normalizedBase}${normalizedRoute}`,
      lastModified: now,
    };
  });
}
