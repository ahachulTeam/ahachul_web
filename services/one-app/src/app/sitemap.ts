import type { MetadataRoute } from 'next';

import { SEO_INDEXABLE_ROUTES } from '@ahhachul/routes';
import { createSitemapEntries } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemapEntries(SITE_URL, SEO_INDEXABLE_ROUTES) as MetadataRoute.Sitemap;
}
