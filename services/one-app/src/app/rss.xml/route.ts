import { createRssXml } from '@ahhachul/seo';

import { SITE_URL, SEO_PAGE_COPY } from '@/constants';
import { appLogger } from '@/lib/observability';
import { getRssFeedContent } from '@/seo/content-discovery';

export const revalidate = 1800;
const rssLogger = appLogger.child('rss');

export async function GET() {
  const feed = await getRssFeedContent('all').catch(error => {
    rssLogger.error('[seo] failed to build global rss feed', undefined, {
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : 'Unknown error',
      userMessage: 'RSS 생성 중 오류가 발생했습니다.',
      isNetworkError: false,
      isAuthError: false,
      isClientError: false,
      isServerError: true,
      isRetryable: true,
    });

    return {
      title: '아하철 통합 RSS',
      link: SITE_URL,
      description: SEO_PAGE_COPY.home.description,
      atomSelfUrl: `${SITE_URL}/rss.xml`,
      items: [],
    };
  });
  const xml = createRssXml(feed);

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': `public, max-age=0, s-maxage=${1800}, stale-while-revalidate=86400`,
    },
  });
}
