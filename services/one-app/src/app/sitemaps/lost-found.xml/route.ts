import { createSitemapXml } from '@ahhachul/seo';

import { getSectionSitemapItems } from '@/seo/content-discovery';

export const revalidate = 1800;

export async function GET() {
  const xml = createSitemapXml(await getSectionSitemapItems('lost-found'));

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `public, max-age=0, s-maxage=${1800}, stale-while-revalidate=86400`,
    },
  });
}
