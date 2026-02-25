import { API_PATHS, API_SORT } from '@ahhachul/http';
import {
  SEO_FEED_LINKS,
  SEO_INDEXABLE_ROUTES,
  SEO_NAVIGATION_LINKS,
  SEO_SITEMAP_SEGMENT_PATHS,
  type SeoSitemapSegment,
} from '@ahhachul/routes';
import { toAbsoluteUrl } from '@ahhachul/seo';

import { API_BASE_URL, SEO_PAGE_COPY, SITE_URL } from '@/constants';
import { appLogger } from '@/lib/observability';

type DiscoverySection = Exclude<SeoSitemapSegment, 'core'>;
const seoDiscoveryLogger = appLogger.child('seo-discovery');

type DiscoveryPost = {
  id: number | string;
  title?: string;
  content?: string;
  createdAt?: string;
  complaintType?: string;
};

type CursorPageResult<TItem> = {
  data: TItem[];
  nextPageToken?: string | null;
};

type ApiResponseEnvelope<T> = {
  result?: T;
};

export const SEO_DISCOVERY_REVALIDATE_SECONDS = 1800;

const DEFAULT_MAX_ITEMS = 1000;
const DEFAULT_PAGE_SIZE = 100;
const DISCOVERY_MAX_ITEMS = Math.max(
  100,
  Number(process.env.SEO_DISCOVERY_MAX_ITEMS ?? DEFAULT_MAX_ITEMS),
);
const DISCOVERY_PAGE_SIZE = Math.max(
  10,
  Math.min(100, Number(process.env.SEO_DISCOVERY_PAGE_SIZE ?? DEFAULT_PAGE_SIZE)),
);

const SECTION_CONFIG: Record<
  DiscoverySection,
  {
    endpoint: string;
    detailPathPrefix: string;
    category: string;
    feedTitle: string;
    feedDescription: string;
  }
> = {
  community: {
    endpoint: API_PATHS.community.list,
    detailPathPrefix: '/community',
    category: '커뮤니티',
    feedTitle: '아하철 커뮤니티 RSS',
    feedDescription: SEO_PAGE_COPY.community.description,
  },
  complaint: {
    endpoint: API_PATHS.complaint.list,
    detailPathPrefix: '/complaint',
    category: '민원',
    feedTitle: '아하철 민원 RSS',
    feedDescription: SEO_PAGE_COPY.complaint.description,
  },
  'lost-found': {
    endpoint: API_PATHS.lostFound.list,
    detailPathPrefix: '/lost-found',
    category: '분실물',
    feedTitle: '아하철 분실물 RSS',
    feedDescription: SEO_PAGE_COPY.lostFound.description,
  },
};

function toDateValue(value?: string) {
  if (!value) return 0;
  const timestamp = new Date(value).getTime();

  return Number.isFinite(timestamp) ? timestamp : 0;
}

function normalizeText(text: string) {
  return text.replaceAll(/\s+/g, ' ').trim();
}

function resolveApiRequestUrl(endpoint: string, params: Record<string, string | number>) {
  const rawBase = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const rawPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const composedPath = `${rawBase}${rawPath}`;

  let url: URL;
  try {
    url = new URL(composedPath);
  } catch {
    url = new URL(composedPath, SITE_URL);
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

async function requestDiscoveryPage(
  endpoint: string,
  params: Record<string, string | number>,
  tag: string,
) {
  const requestUrl = resolveApiRequestUrl(endpoint, params);
  const response = await fetch(requestUrl, {
    next: {
      revalidate: SEO_DISCOVERY_REVALIDATE_SECONDS,
      tags: [tag],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch discovery page: ${response.status}`);
  }

  const json = (await response.json().catch(() => null)) as ApiResponseEnvelope<
    CursorPageResult<DiscoveryPost>
  > | null;
  const result = json?.result;
  const data = Array.isArray(result?.data) ? result.data : [];
  const nextPageToken = result?.nextPageToken ?? null;

  return {
    data,
    nextPageToken,
  };
}

type DiscoverOptions = {
  maxItems?: number;
  extraParams?: Record<string, string | number>;
};

async function collectSectionPosts(
  section: DiscoverySection,
  options: DiscoverOptions = {},
): Promise<DiscoveryPost[]> {
  const config = SECTION_CONFIG[section];
  const maxItems = options.maxItems ?? DISCOVERY_MAX_ITEMS;
  const tag = `seo-discovery-${section}`;
  const dedupeMap = new Map<string, DiscoveryPost>();
  let pageToken: string | null = null;
  let pageGuard = 0;

  while (dedupeMap.size < maxItems && pageGuard < 100) {
    pageGuard += 1;
    const requestParams: Record<string, string | number> = {
      pageSize: DISCOVERY_PAGE_SIZE,
      sort: API_SORT.createdAtDesc,
      ...(pageToken ? { pageToken } : {}),
      ...(options.extraParams ?? {}),
    };
    let page;

    try {
      page = await requestDiscoveryPage(config.endpoint, requestParams, tag);
    } catch (error) {
      const fallbackParams = { ...requestParams };
      delete fallbackParams.sort;
      page = await requestDiscoveryPage(config.endpoint, fallbackParams, tag).catch(() => {
        throw error;
      });
    }

    if (page.data.length === 0) {
      break;
    }

    page.data.forEach(post => {
      const id = String(post.id);
      if (!id || dedupeMap.has(id)) return;
      dedupeMap.set(id, post);
    });

    if (!page.nextPageToken) {
      break;
    }

    pageToken = page.nextPageToken;
  }

  return Array.from(dedupeMap.values()).slice(0, maxItems);
}

async function collectLostFoundPosts(maxItems?: number) {
  const [lost, acquire] = await Promise.all([
    collectSectionPosts('lost-found', { maxItems, extraParams: { lostType: 'LOST' } }),
    collectSectionPosts('lost-found', { maxItems, extraParams: { lostType: 'ACQUIRE' } }),
  ]);
  const dedupeMap = new Map<string, DiscoveryPost>();

  [...lost, ...acquire].forEach(post => {
    const id = String(post.id);
    if (!id || dedupeMap.has(id)) return;
    dedupeMap.set(id, post);
  });

  return Array.from(dedupeMap.values()).slice(0, maxItems ?? DISCOVERY_MAX_ITEMS);
}

export async function getSectionPosts(section: DiscoverySection, maxItems?: number) {
  try {
    if (section === 'lost-found') {
      return await collectLostFoundPosts(maxItems);
    }

    return await collectSectionPosts(section, { maxItems });
  } catch (error) {
    seoDiscoveryLogger.error(
      `[seo] failed to collect section posts: ${section}`,
      {
        section,
      },
      {
        name: error instanceof Error ? error.name : 'UnknownError',
        message: error instanceof Error ? error.message : 'Unknown error',
        userMessage: 'SEO 수집 처리 중 오류가 발생했습니다.',
        isNetworkError: false,
        isAuthError: false,
        isClientError: false,
        isServerError: true,
        isRetryable: true,
      },
    );
    return [];
  }
}

export function getSeoNavigationLinks() {
  return SEO_NAVIGATION_LINKS.map(link => ({
    ...link,
    url: toAbsoluteUrl(SITE_URL, link.path),
  }));
}

export function getSeoFeedLinks() {
  return SEO_FEED_LINKS.map(link => ({
    ...link,
    url: toAbsoluteUrl(SITE_URL, link.path),
  }));
}

export function getSitemapIndexItems() {
  const now = new Date();

  return Object.values(SEO_SITEMAP_SEGMENT_PATHS).map(pathname => ({
    loc: toAbsoluteUrl(SITE_URL, pathname),
    lastmod: now,
  }));
}

export function getCoreSitemapItems() {
  const now = new Date();

  return SEO_INDEXABLE_ROUTES.map(pathname => ({
    loc: toAbsoluteUrl(SITE_URL, pathname),
    lastmod: now,
    changefreq: pathname === '/' ? ('daily' as const) : ('hourly' as const),
    priority: pathname === '/' ? 1 : 0.9,
  }));
}

export async function getSectionSitemapItems(section: DiscoverySection, maxItems?: number) {
  const config = SECTION_CONFIG[section];

  try {
    const posts = await getSectionPosts(section, maxItems);

    return posts.map(post => ({
      loc: toAbsoluteUrl(SITE_URL, `${config.detailPathPrefix}/${post.id}`),
      lastmod: post.createdAt ?? new Date(),
      changefreq: 'hourly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    seoDiscoveryLogger.error(
      `[seo] failed to build sitemap for ${section}`,
      {
        section,
      },
      {
        name: error instanceof Error ? error.name : 'UnknownError',
        message: error instanceof Error ? error.message : 'Unknown error',
        userMessage: 'SEO 사이트맵 생성 중 오류가 발생했습니다.',
        isNetworkError: false,
        isAuthError: false,
        isClientError: false,
        isServerError: true,
        isRetryable: true,
      },
    );
    return [];
  }
}

type FeedItem = {
  title: string;
  link: string;
  description: string;
  pubDate?: string;
  guid: string;
  category: string;
};

function toFeedItem(section: DiscoverySection, post: DiscoveryPost): FeedItem {
  const config = SECTION_CONFIG[section];
  const link = toAbsoluteUrl(SITE_URL, `${config.detailPathPrefix}/${post.id}`);
  const title = normalizeText(post.title || post.complaintType || `${config.category} ${post.id}`);
  const description = post.content
    ? normalizeText(post.content).slice(0, 220)
    : `${config.category} 게시글 상세 페이지`;

  return {
    title: `[${config.category}] ${title}`,
    link,
    description,
    pubDate: post.createdAt,
    guid: link,
    category: config.category,
  };
}

function sortFeedItems(items: FeedItem[]) {
  return items.sort((a, b) => toDateValue(b.pubDate) - toDateValue(a.pubDate));
}

export async function getRssFeedContent(section: DiscoverySection | 'all'): Promise<{
  title: string;
  link: string;
  description: string;
  atomSelfUrl: string;
  items: FeedItem[];
}> {
  if (section === 'all') {
    const [communityPosts, complaintPosts, lostFoundPosts] = await Promise.all([
      getSectionPosts('community', 100),
      getSectionPosts('complaint', 100),
      getSectionPosts('lost-found', 100),
    ]);
    const items = sortFeedItems([
      ...communityPosts.map(post => toFeedItem('community', post)),
      ...complaintPosts.map(post => toFeedItem('complaint', post)),
      ...lostFoundPosts.map(post => toFeedItem('lost-found', post)),
    ]).slice(0, 150);

    return {
      title: '아하철 통합 RSS',
      link: SITE_URL,
      description: SEO_PAGE_COPY.home.description,
      atomSelfUrl: toAbsoluteUrl(SITE_URL, '/rss.xml'),
      items,
    };
  }

  const config = SECTION_CONFIG[section];
  const items = sortFeedItems(
    (await getSectionPosts(section, 150)).map(post => toFeedItem(section, post)),
  );

  return {
    title: config.feedTitle,
    link: toAbsoluteUrl(SITE_URL, config.detailPathPrefix),
    description: config.feedDescription,
    atomSelfUrl: toAbsoluteUrl(SITE_URL, `${config.detailPathPrefix}/rss.xml`),
    items,
  };
}
