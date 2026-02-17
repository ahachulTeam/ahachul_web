import type { Metadata } from 'next';
import Link from 'next/link';

import { createPageMetadata } from '@ahhachul/seo';

import HomeFooter from '@/app/_components/HomeFooter';
import WelcomeMessage from '@/app/_components/WelcomeMessage';
import { SEO_KEYWORDS, SITE_URL, withBrandTitle } from '@/constant';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getSeoNavigationLinks } from '@/seo/content-discovery';

const HOME_LINK_KEY_BY_PATH = {
  '/community': 'community',
  '/complaint': 'complaint',
  '/lost-found': 'lostFound',
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const localizedPathname = localizePathname('/', locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.home.title),
    description: messages.seo.home.description,
    keywords: [...SEO_KEYWORDS],
    siteUrl: SITE_URL,
    pathname: localizedPathname,
    rssPath: localizePathname('/rss.xml', locale),
  }) as Metadata;
}

export default async function Home() {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const navigationLinks = getSeoNavigationLinks()
    .filter(link => link.path !== '/me')
    .map(link => {
      const key = HOME_LINK_KEY_BY_PATH[link.path as keyof typeof HOME_LINK_KEY_BY_PATH];
      const localizedCopy = key ? messages.home.quickLinks[key] : null;

      return {
        ...link,
        path: localizePathname(link.path, locale),
        name: localizedCopy?.name ?? link.name,
        description: localizedCopy?.description ?? link.description,
      };
    });

  return (
    <main className="flex min-h-screen flex-col text-black bg-white pt-4 ">
      <WelcomeMessage />
      <section className="px-5 pt-6">
        <h1 className="text-title-large text-gray-100">{messages.home.title}</h1>
        <p className="mt-2 text-body-medium text-gray-80">{messages.home.description}</p>
      </section>

      <section className="px-5 pb-6 pt-5">
        <h2 className="text-title-small text-gray-100">{messages.home.quickLinksHeading}</h2>
        <ul className="mt-3 grid gap-2">
          {navigationLinks.map(link => (
            <li key={link.path}>
              <Link
                href={link.path}
                className="block rounded-2xl border border-gray-30 bg-white px-4 py-3"
              >
                <p className="text-label-large text-gray-100">{link.name}</p>
                <p className="mt-1 text-body-small text-gray-70">{link.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <HomeFooter title={messages.home.footerTitle} description={messages.home.footerDescription} />
    </main>
  );
}
