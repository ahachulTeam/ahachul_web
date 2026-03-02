import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';

import { colors } from '@ahhachul/design-system';
import '@ahhachul/design-system/tokens.css';
import { createPageMetadata } from '@ahhachul/seo';

import { Pretendard } from '@/assets/font/pretendard';
import { SEO_KEYWORDS, SITE_URL, withBrandTitle } from '@/constants';
import Providers from '@/contexts/providers';
import { HTML_LANG_BY_LOCALE, getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';
import { cn } from '@/utils/cn';

import Header from './_components/Header';
import NavMenu from './_components/NavMenu';
import './globals.css';

export const viewport: Viewport = {
  themeColor: colors.white,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.home.title),
    description: messages.seo.home.description,
    keywords: [...SEO_KEYWORDS],
    siteUrl: SITE_URL,
    rssPath: localizePathname('/rss.xml', locale),
    ...getLocalizedMetadataOptions('/', locale),
  }) as Metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={HTML_LANG_BY_LOCALE[locale]}>
      <body suppressHydrationWarning className={cn('font-sans antialiased', Pretendard.variable)}>
        {/* SEO 임시 비활성화: Vite 홈 동등화 이후 재활성화 예정 */}
        <NextTopLoader height={2} color={colors['key-color']} showSpinner={false} />
        <Providers>
          <div className="relative mx-auto min-h-screen w-full max-w-[560px]">
            <Header />
            <div className="relative z-10">{children}</div>
            <NavMenu />
          </div>
        </Providers>
      </body>
    </html>
  );
}
