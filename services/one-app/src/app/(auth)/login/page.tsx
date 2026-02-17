import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { HelloOnLogin, SocialLogins } from '@/app/(auth)/login/_component';
import { SEO_PAGE_COPY, SITE_URL, withBrandTitle } from '@/constant';

export const metadata: Metadata = createPageMetadata({
  title: withBrandTitle(SEO_PAGE_COPY.login.title),
  description: SEO_PAGE_COPY.login.description,
  siteUrl: SITE_URL,
  pathname: '/login',
  noIndex: true,
}) as Metadata;

export default function Login() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <HelloOnLogin />
      <section className="fixed bottom-[34px] left-0 right-0 flex flex-col gap-2 px-[30px] pt-6">
        <SocialLogins />
      </section>
    </main>
  );
}
