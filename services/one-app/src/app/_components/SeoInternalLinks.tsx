import Link from 'next/link';

import { getSeoFeedLinks, getSeoNavigationLinks } from '@/seo/content-discovery';

export default function SeoInternalLinks() {
  const navigationLinks = getSeoNavigationLinks();
  const feedLinks = getSeoFeedLinks();

  return (
    <section className="border-t border-gray-20 bg-gray-10 px-5 pb-20 pt-5">
      <h2 className="text-label-medium text-gray-90">아하철 서비스 링크</h2>
      <p className="mt-1 text-body-small text-gray-70">
        지하철 민원, 분실물, 커뮤니티 주요 페이지와 피드를 빠르게 이동할 수 있습니다.
      </p>

      <ul className="mt-3 grid grid-cols-2 gap-2">
        {navigationLinks.map(link => (
          <li key={link.path}>
            <Link
              href={link.path}
              className="block rounded-xl border border-gray-30 bg-white px-3 py-2 text-label-medium text-gray-90"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="mt-5 text-label-medium text-gray-90">구독 피드</h3>
      <ul className="mt-2 space-y-1">
        {feedLinks.map(link => (
          <li key={link.path}>
            <Link
              href={link.path}
              className="text-body-small text-gray-80 underline underline-offset-2"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
