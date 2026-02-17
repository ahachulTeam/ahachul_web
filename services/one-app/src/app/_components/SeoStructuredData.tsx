import { BRAND } from '@ahhachul/domain';
import {
  createOrganizationJsonLd,
  createSiteNavigationJsonLd,
  createWebsiteJsonLd,
} from '@ahhachul/seo';

import { SITE_URL } from '@/constant';
import { getSeoNavigationLinks } from '@/seo/content-discovery';

import JsonLdScript from './JsonLdScript';

export default function SeoStructuredData() {
  const navigationLinks = getSeoNavigationLinks();
  const websiteJsonLd = createWebsiteJsonLd({
    siteUrl: SITE_URL,
    name: BRAND.appName,
    description: BRAND.defaultDescription,
  });
  const organizationJsonLd = createOrganizationJsonLd({
    siteUrl: SITE_URL,
    name: BRAND.appName,
    logoUrl: BRAND.defaultOgImage,
  });
  const siteNavigationJsonLd = createSiteNavigationJsonLd(
    navigationLinks.map(link => ({
      name: link.name,
      url: link.url,
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
