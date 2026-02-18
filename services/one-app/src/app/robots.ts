import type { MetadataRoute } from 'next';

import { createRobots } from '@ahhachul/seo';

import { SITE_URL } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  return createRobots(SITE_URL) as MetadataRoute.Robots;
}
