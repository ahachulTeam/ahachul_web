import { BRAND } from '@ahhachul/domain';
import {
  createOrganizationJsonLd,
  createSiteNavigationJsonLd,
  createWebsiteJsonLd,
  toAbsoluteUrl,
} from '@ahhachul/seo';

import { SITE_URL } from '@/constants';
import { getLocaleMessages, localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getSeoNavigationLinks } from '@/seo/content-discovery';
import { getSchemaLanguage } from '@/seo/locale';

import JsonLdScript from './JsonLdScript';

const NAV_LABEL_KEY_BY_PATH = {
  '/': 'home',
  '/community': 'community',
  '/complaint': 'complaint',
  '/lost-found': 'lostFound',
} as const;

export default async function SeoStructuredData() {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const navigationLinks = getSeoNavigationLinks();
  const websiteJsonLd = createWebsiteJsonLd({
    siteUrl: SITE_URL,
    name: BRAND.appName,
    description: messages.seo.home.description,
    inLanguage: getSchemaLanguage(locale),
  });
  const organizationJsonLd = createOrganizationJsonLd({
    siteUrl: SITE_URL,
    name: BRAND.appName,
    logoUrl: BRAND.defaultOgImage,
  });
  const siteNavigationJsonLd = createSiteNavigationJsonLd(
    navigationLinks.map(link => ({
      name:
        link.path in NAV_LABEL_KEY_BY_PATH
          ? messages.nav[NAV_LABEL_KEY_BY_PATH[link.path as keyof typeof NAV_LABEL_KEY_BY_PATH]]
          : link.name,
      url: toAbsoluteUrl(SITE_URL, localizePathname(link.path, locale)),
    })),
  );

  return (
    <>
      <JsonLdScript id="ahhachul-website-jsonld" payload={websiteJsonLd} />
      <JsonLdScript id="ahhachul-organization-jsonld" payload={organizationJsonLd} />
      <JsonLdScript id="ahhachul-navigation-jsonld" payload={siteNavigationJsonLd} />
    </>
  );
}
