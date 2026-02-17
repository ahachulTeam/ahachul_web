import Link from 'next/link';

import { createBreadcrumbJsonLd, toAbsoluteUrl } from '@ahhachul/seo';

import { SITE_URL } from '@/constant';

import JsonLdScript from './JsonLdScript';

type BreadcrumbItem = {
  name: string;
  href: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export default function BreadcrumbNav({ items }: Props) {
  const breadcrumbJsonLd = createBreadcrumbJsonLd(
    items.map(item => ({
      name: item.name,
      url: toAbsoluteUrl(SITE_URL, item.href),
    })),
  );

  return (
    <>
      <nav aria-label="breadcrumb" className="px-5 pb-2 pt-2">
        <ol className="flex flex-wrap items-center gap-1 text-body-small text-gray-70">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.href}-${item.name}`} className="inline-flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="text-gray-90">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.href} className="underline underline-offset-2">
                    {item.name}
                  </Link>
                )}
                {!isLast && <span aria-hidden>{'/'}</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLdScript payload={breadcrumbJsonLd} />
    </>
  );
}
