import type { Metadata } from 'next';
import Link from 'next/link';

import { createPageMetadata } from '@ahhachul/seo';

import { SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle(SEO_PAGE_COPY.notFound.title),
  description: SEO_PAGE_COPY.notFound.description,
  siteUrl: SITE_URL,
  pathname: '/not-found',
  noIndex: true,
}) as Metadata;

export default function NotFound() {
  return (
    <div className=" flex flex-col gap-2">
      <div className=" text-black">이 페이지는 존재하지 않습니다. 다른 페이지를 구경해보세요.</div>
      <Link href="/" className=" text-black">
        홈으로 이동
      </Link>
    </div>
  );
}
