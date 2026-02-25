import { createRssXml } from '@ahhachul/seo';

import { SITE_URL, SEO_PAGE_COPY } from '@/constants';
import { appLogger } from '@/lib/observability';
import { getRssFeedContent } from '@/seo/content-discovery';

export const revalidate = 1800;
const lostFoundRssLogger = appLogger.child('rss:lost-found');

export async function GET() {
  const feed = await getRssFeedContent('lost-found').catch(error => {
    lostFoundRssLogger.error('[seo] failed to build lost-found rss feed', undefined, {
      name: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : 'Unknown error',
      userMessage: '분실물 RSS 생성 중 오류가 발생했습니다.',
      isNetworkError: false,
      isAuthError: false,
      isClientError: false,
      isServerError: true,
      isRetryable: true,
    });

    return {
      title: '아하철 분실물 RSS',
      link: `${SITE_URL}/lost-found`,
      description: SEO_PAGE_COPY.lostFound.description,
      atomSelfUrl: `${SITE_URL}/lost-found/rss.xml`,
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
