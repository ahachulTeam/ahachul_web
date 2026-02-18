import { createRssXml } from '@ahhachul/seo';

import { SITE_URL, SEO_PAGE_COPY } from '@/constants';
import { getRssFeedContent } from '@/seo/content-discovery';

export const revalidate = 1800;

export async function GET() {
  const feed = await getRssFeedContent('complaint').catch(error => {
    console.error('[seo] failed to build complaint rss feed', error);

    return {
      title: '아하철 민원 RSS',
      link: `${SITE_URL}/complaint`,
      description: SEO_PAGE_COPY.complaint.description,
      atomSelfUrl: `${SITE_URL}/complaint/rss.xml`,
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
